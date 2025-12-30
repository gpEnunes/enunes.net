---
title: Building Scalable RESTful APIs with Laravel
description: Architectural decisions and lessons learned from building Laravel APIs in production.
date: 2025-12-26
author: Emerson Nunes
---

# Building Scalable RESTful APIs with Laravel: Lessons from Production

_Published on December 26, 2025_

After building and maintaining several Laravel APIs serving millions of requests, I've learned that scalability isn't just about handling traffic—it's about writing code that grows with your business. Here are the architectural decisions that made the difference.

## Architecture Overview

A scalable API needs clear separation of concerns. Here's the structure I use:

```
app/
├── Http/
│   ├── Controllers/     # Thin controllers
│   ├── Requests/        # Form validation
│   └── Resources/       # Response transformers
├── Services/            # Business logic
├── Repositories/        # Data access layer
└── Models/              # Eloquent models
```

## Pattern 1: API Resources for Response Transformation

Never return models directly. Always use API Resources:

```php
// app/Http/Resources/UserResource.php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toISOString(),
            'posts_count' => $this->whenLoaded('posts', function () {
                return $this->posts->count();
            }),
            'subscription' => new SubscriptionResource($this->whenLoaded('subscription')),
        ];
    }
}
```

This gives you:

- Consistent response structure
- Easy versioning
- Conditional attributes
- Relationship loading control

## Pattern 2: Form Requests for Validation

Keep validation out of controllers:

```php
// app/Http/Requests/StoreUserRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'This email is already registered.',
            'password.min' => 'Password must be at least 8 characters.',
        ];
    }
}
```

Usage in controller:

```php
public function store(StoreUserRequest $request)
{
    // $request is already validated
    $user = User::create($request->validated());
    return new UserResource($user);
}
```

## Pattern 3: Service Layer for Business Logic

Controllers should be thin. Move business logic to services:

```php
// app/Services/UserService.php
namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function createUser(array $data): User
    {
        $data['password'] = Hash::make($data['password']);

        $user = $this->userRepository->create($data);

        // Send welcome email
        // Create default settings
        // Log user creation

        return $user;
    }

    public function updateUser(User $user, array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->userRepository->update($user, $data);
    }
}
```

This makes testing easier and keeps your codebase maintainable.

## Pattern 4: Repository Pattern for Data Access

Abstract database queries behind repositories:

```php
// app/Repositories/UserRepository.php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function getActiveUsers(): Collection
    {
        return User::where('active', true)
                   ->orderBy('created_at', 'desc')
                   ->get();
    }
}
```

Benefits:

- Easy to swap data sources
- Centralized query logic
- Better testability
- Cleaner controllers

## Pattern 5: API Versioning

Plan for breaking changes from day one:

```php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::apiResource('users', Api\V1\UserController::class);
});

Route::prefix('v2')->group(function () {
    Route::apiResource('users', Api\V2\UserController::class);
});
```

Use different controllers for different versions to maintain backward compatibility.

## Pattern 6: Rate Limiting

Protect your API from abuse:

```php
// app/Providers/RouteServiceProvider.php
protected function configureRateLimiting()
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by(
            $request->user()?->id ?: $request->ip()
        );
    });

    RateLimiter::for('api-strict', function (Request $request) {
        return Limit::perMinute(10)->by(
            $request->user()?->id ?: $request->ip()
        );
    });
}
```

Apply to routes:

```php
Route::middleware(['throttle:api'])->group(function () {
    // Most endpoints
});

Route::middleware(['throttle:api-strict'])->group(function () {
    // Expensive operations
});
```

## Pattern 7: Response Caching

Cache expensive operations:

```php
public function index(Request $request)
{
    $cacheKey = 'users_list_' . $request->get('page', 1);

    $users = Cache::remember($cacheKey, 3600, function () {
        return User::with('posts')->paginate(20);
    });

    return UserResource::collection($users);
}
```

Invalidate cache when data changes:

```php
public function store(StoreUserRequest $request)
{
    $user = User::create($request->validated());

    Cache::tags(['users'])->flush();

    return new UserResource($user);
}
```

## Pattern 8: Eager Loading to Prevent N+1 Queries

Always load relationships upfront:

```php
// Bad - N+1 problem
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count(); // New query for each user
}

// Good - Single query
$users = User::withCount('posts')->get();
foreach ($users as $user) {
    echo $user->posts_count;
}
```

## Pattern 9: Exception Handling

Create a consistent error response:

```php
// app/Exceptions/Handler.php
public function render($request, Throwable $exception)
{
    if ($request->is('api/*')) {
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'message' => 'Resource not found'
            ], 404);
        }

        if ($exception instanceof ValidationException) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        return response()->json([
            'message' => 'Server error'
        ], 500);
    }

    return parent::render($request, $exception);
}
```

## Pattern 10: API Documentation

Use Laravel's built-in tools or packages like Scribe:

```php
/**
 * @group User Management
 *
 * APIs for managing users
 */
class UserController extends Controller
{
    /**
     * Get all users
     *
     * @response 200 {
     *   "data": [{"id": 1, "name": "John Doe", "email": "john@example.com"}]
     * }
     */
    public function index()
    {
        // ...
    }
}
```

## Performance Tips

1. **Use database indexing**: Index foreign keys and frequently queried columns
2. **Implement pagination**: Never return all records
3. **Use query optimization**: Select only needed columns
4. **Cache aggressively**: Cache expensive computations
5. **Use queues**: Move slow operations to background jobs

## Testing

Write feature tests for your API endpoints:

```php
public function test_user_can_be_created()
{
    $response = $this->postJson('/api/v1/users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertStatus(201)
             ->assertJsonStructure([
                 'data' => ['id', 'name', 'email', 'created_at']
             ]);

    $this->assertDatabaseHas('users', [
        'email' => 'john@example.com'
    ]);
}
```

## Conclusion

Building scalable APIs is about making smart architectural decisions early. Use layers of abstraction, plan for growth, and always think about the developer experience—both for your API consumers and your future self maintaining the code.

These patterns have served me well across multiple production applications. They might seem like overhead at first, but they pay dividends as your application grows.

---

_What patterns do you use for building APIs? Share your experiences in the comments!_

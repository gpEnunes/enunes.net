# Vue 3 Composition API: Patterns That Changed My Development Workflow

_Published on December 28, 2025_

The Composition API introduced in Vue 3 fundamentally changed how we write Vue applications. After two years of working with it extensively, I've discovered patterns that dramatically improved my code quality and development speed. Let me share what I've learned.

## Why Composition API?

The Options API served us well, but as components grew, related logic became scattered across different options. The Composition API solves this by organizing code by logical concerns rather than option types.

## Pattern 1: Composables for Reusable Logic

Composables are the heart of modern Vue development. They're functions that encapsulate and reuse stateful logic:

```javascript
// composables/useApi.js
import { ref } from 'vue'
import axios from 'axios'

export function useApi(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetch = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(url)
      data.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetch }
}
```

Usage in components becomes incredibly clean:

```javascript
const { data: users, loading, fetch } = useApi('/api/users')
```

## Pattern 2: Form Handling with Composables

Forms are everywhere. Here's a pattern I use for handling form state and validation:

```javascript
// composables/useForm.js
import { reactive, computed } from 'vue'

export function useForm(initialValues, validationRules) {
  const form = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})

  const isValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  const validate = (field) => {
    if (!validationRules[field]) return

    const rule = validationRules[field]
    const value = form[field]

    if (rule.required && !value) {
      errors[field] = `${field} is required`
      return
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`
      return
    }

    delete errors[field]
  }

  const handleBlur = (field) => {
    touched[field] = true
    validate(field)
  }

  const handleSubmit = (callback) => {
    return () => {
      Object.keys(form).forEach(validate)

      if (isValid.value) {
        callback(form)
      }
    }
  }

  return {
    form,
    errors,
    touched,
    isValid,
    handleBlur,
    handleSubmit,
  }
}
```

Using it in a component:

```vue
<script setup>
import { useForm } from '@/composables/useForm'

const { form, errors, touched, isValid, handleBlur, handleSubmit } = useForm(
  { email: '', password: '' },
  {
    email: { required: true },
    password: { required: true, minLength: 8 },
  }
)

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.email" @blur="handleBlur('email')" type="email" />
    <span v-if="touched.email && errors.email">{{ errors.email }}</span>

    <button :disabled="!isValid">Submit</button>
  </form>
</template>
```

## Pattern 3: Automatic Cleanup with watchEffect

One pattern I love is using `watchEffect` for side effects that need cleanup:

```javascript
import { watchEffect } from 'vue'

export function useWebSocket(url) {
  const messages = ref([])
  let ws = null

  watchEffect((onCleanup) => {
    ws = new WebSocket(url)

    ws.onmessage = (event) => {
      messages.value.push(JSON.parse(event.data))
    }

    onCleanup(() => {
      ws?.close()
    })
  })

  return { messages }
}
```

The cleanup function automatically runs when the component unmounts or when dependencies change.

## Pattern 4: State Management with Provide/Inject

For local state sharing, provide/inject is often simpler than Pinia:

```javascript
// App.vue
import { provide, ref } from 'vue'

const user = ref(null)
const setUser = (newUser) => (user.value = newUser)

provide('user', { user, setUser })
```

```javascript
// Any child component
import { inject } from 'vue'

const { user, setUser } = inject('user')
```

## Pattern 5: Computed Properties for Derived State

Keep your components reactive and performant:

```javascript
const searchQuery = ref('')
const users = ref([...])

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
```

This automatically updates when either `searchQuery` or `users` changes, and Vue caches the result.

## Pattern 6: Composable Composition

The real power comes from combining composables:

```javascript
export function useUserManagement() {
  const { data: users, loading, fetch } = useApi('/api/users')
  const { form, handleSubmit } = useForm({ name: '', email: '' })

  const addUser = handleSubmit(async (values) => {
    await axios.post('/api/users', values)
    fetch() // Refresh the list
  })

  return {
    users,
    loading,
    form,
    addUser,
  }
}
```

## Best Practices I've Learned

1. **Name composables with "use" prefix**: It's a convention that makes code more readable
2. **Return reactive references, not raw values**: Always return refs or reactive objects
3. **Keep composables focused**: Each composable should handle one concern
4. **Use TypeScript**: The Composition API shines with TypeScript support
5. **Extract early**: If you use logic in two components, make it a composable

## Conclusion

The Composition API isn't just a new syntax—it's a new way of thinking about component logic. By organizing code around features rather than lifecycle hooks, we create more maintainable and testable applications.

These patterns have saved me countless hours and made my Vue applications more enjoyable to work with. Give them a try and see how they improve your workflow.

---

_What patterns have you discovered with the Composition API? I'd love to hear about them!_

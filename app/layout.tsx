import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'enunes.net',
  description: 'Portfólio de Emerson Nunes — Desenvolvedor Fullstack com foco em front end moderno',
  keywords: ['Emerson Nunes', 'Desenvolvedor Fullstack', 'React', 'Vue', 'Next.js', 'Portfólio'],
  authors: [{ name: 'Emerson Nunes', url: 'https://enunes.net' }],
  creator: 'Emerson Nunes',
  robots: 'index, follow',
  openGraph: {
    title: 'enunes.net',
    description:
      'Portfólio de Emerson Nunes — Desenvolvedor Fullstack com foco em front end moderno',
    url: 'https://enunes.net',
    siteName: 'enunes.net',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imagem de capa do portfólio de Emerson Nunes',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <main className="w-full px-6">{children}</main>
      </body>
    </html>
  );
}

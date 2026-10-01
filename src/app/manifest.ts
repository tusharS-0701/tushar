import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tushar Sharma',
    short_name: 'Tushar',
    description: 'The personal website of software engineer and builder Tushar Sharma.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b0d12',
    icons: [
      {
        src: '/favicon-512.png?v=2',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

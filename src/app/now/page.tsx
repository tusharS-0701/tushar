import type { Metadata } from 'next'
import { PlaceholderPage } from '../../components/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Now | Tushar Sharma',
  description: 'What Tushar Sharma is currently building, learning, and exploring.',
  alternates: { canonical: '/now' },
}

export default function NowPage() {
  return <PlaceholderPage eyebrow="Now" title="A live snapshot is coming soon." description="This page will track what I’m building, learning, reading, and thinking about right now. Check back shortly for the first update." activePath="/now" />
}

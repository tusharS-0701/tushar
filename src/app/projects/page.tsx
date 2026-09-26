import type { Metadata } from 'next'
import { PlaceholderPage } from '../../components/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Projects | Tushar Sharma',
  description: 'Projects and experiments by Tushar Sharma.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return <PlaceholderPage eyebrow="Selected work" title="The projects archive is taking shape." description="I’m documenting the products, experiments, and open-source work worth sharing. The full case studies will be here soon." activePath="/projects" />
}

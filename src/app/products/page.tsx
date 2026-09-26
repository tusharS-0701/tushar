import type { Metadata } from 'next'
import { PlaceholderPage } from '../../components/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Products | Tushar Sharma',
  description: 'Products designed and built by Tushar Sharma.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return <PlaceholderPage
    eyebrow="Products"
    title="Useful products are on the way."
    description="I’m building focused software for creators, founders, and small teams. Product details, demos, and launch updates will live here."
    activePath="/products"
  />
}

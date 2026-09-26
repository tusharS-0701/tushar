import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

export default function nextConfig(phase) {
  return {
    // Keep `next dev` isolated from `next build`. Running both at once against
    // `.next` can leave the dev server referencing manifests the build removed.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  }
}

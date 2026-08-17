import type { Project } from '../../data/content'
import { projectIconMap } from '../icons/iconMaps'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = projectIconMap[project.icon]

  return (
    <article className="project-card">
      <p className="cap-index">{String(index + 1).padStart(2, '0')}</p>
      <Icon className="project-icon" />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="project-link font-mono"
      >
        View on GitHub &rarr;
      </a>
    </article>
  )
}

import { projects } from '../../data/content'
import { Reveal } from '../atoms/Reveal'
import { ProjectCard } from '../molecules/ProjectCard'

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-block">
      <Reveal>
        <h2 className="section-title">Featured Projects</h2>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.05}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

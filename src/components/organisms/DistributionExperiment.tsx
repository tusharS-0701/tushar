import { distributionExperiment } from '../../data/content'
import { Reveal } from '../atoms/Reveal'
import { ArrowLink } from '../atoms/ArrowLink'
import { Eyebrow } from '../atoms/Eyebrow'
import { TypewriterIcon } from '../icons/Icons'

export function DistributionExperiment() {
  return (
    <section id="notes" className="section-block">
      <Reveal>
        <Eyebrow>{distributionExperiment.eyebrow}</Eyebrow>
        <h2 className="section-title mt-2">{distributionExperiment.title}</h2>
        <p className="section-subhead mt-2">{distributionExperiment.subhead}</p>
        <div className="distribution-grid mt-6">
          <div className="distribution-illustration">
            <TypewriterIcon className="distribution-icon" />
          </div>
          <div className="distribution-copy">
            <p>{distributionExperiment.body}</p>
            <ArrowLink href="#journal" className="mt-5">
              Read story
            </ArrowLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

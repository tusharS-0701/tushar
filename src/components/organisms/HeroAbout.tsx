import { heroAbout } from '../../data/content'
import { Reveal } from '../atoms/Reveal'

export function HeroAbout() {
  return (
    <section id="about">
      <Reveal>
        <h2 className="hero-headline">{heroAbout.headline}</h2>
      </Reveal>
      <Reveal delay={0.08} className="hero-about-grid">
        <div className="portrait-frame">
          <img src="/pfp.png" alt="Tushar Sharma" className="portrait-photo" />
        </div>
        <div className="hero-about-copy">
          <p>{heroAbout.bodyOne}</p>
          <p className="mt-4">{heroAbout.bodyTwo}</p>
        </div>
      </Reveal>
    </section>
  )
}

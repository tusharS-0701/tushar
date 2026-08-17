import { LazyMotion, domAnimation } from 'framer-motion'
import { NewspaperLayout } from './components/templates/NewspaperLayout'
import { DailyNoteBox } from './components/organisms/DailyNoteBox'
import { DispatchesBox } from './components/organisms/DispatchesBox'
import { NowBox } from './components/organisms/NowBox'
import { HeroAbout } from './components/organisms/HeroAbout'
import { DistributionExperiment } from './components/organisms/DistributionExperiment'
import { FeaturedProjects } from './components/organisms/FeaturedProjects'
import { DeskNote } from './components/organisms/DeskNote'
import { HeadlinesBox } from './components/organisms/HeadlinesBox'
import { OnTheShelfBox } from './components/organisms/OnTheShelfBox'
import { ConnectBox } from './components/organisms/ConnectBox'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <NewspaperLayout
        left={
          <>
            <DailyNoteBox />
            <DispatchesBox />
            <NowBox />
          </>
        }
        center={
          <>
            <HeroAbout />
            <DistributionExperiment />
            <FeaturedProjects />
            <DeskNote />
          </>
        }
        right={
          <>
            <HeadlinesBox />
            <OnTheShelfBox />
            <ConnectBox />
          </>
        }
      />
    </LazyMotion>
  )
}

export default App

import StatusBar from '../components/StatusBar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import News from '../components/News'
import InfoGrids from '../components/InfoGrids'
import Forms from '../components/Forms'
import MapSection from '../components/MapSection'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <StatusBar />
      <Hero />
      <Services />
      <News />
      <InfoGrids />
      <Forms />
      <MapSection />
    </main>
  )
}



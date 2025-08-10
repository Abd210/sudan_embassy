import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AlertBar from './components/AlertBar'
import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Services from './components/Services'
import News from './components/News'
import InfoGrids from './components/InfoGrids'
import Forms from './components/Forms'
import MapSection from './components/MapSection'
import Footer from './components/Footer'
import HelpButton from './components/HelpButton'
import HomePage from './pages/HomePage'
import ConsularPage from './pages/ConsularPage'
import AppointmentsPage from './pages/AppointmentsPage'
import NewsPage from './pages/NewsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/Admin'

function App() {
  return (
    <div className="bg-gray-100 min-h-dvh">
      <Header />
      <AlertBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consular-services" element={<ConsularPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about-sudan" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
      <HelpButton />
    </div>
  )
}

export default App

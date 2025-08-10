import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div id="hero-banner" className="bg-gradient-to-r from-sudan-green to-sudan-blue rounded-lg shadow-md overflow-hidden mb-6 h-[400px] relative">
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="relative z-10 flex h-full">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">Embassy of the Republic of Sudan</h1>
          <h2 className="text-xl text-white mb-6">Bucharest, Romania</h2>
          <p className="text-white mb-8">Serving Sudanese citizens and facilitating diplomatic and consular relations between Sudan and Romania.</p>
          <div className="flex flex-wrap space-x-0 space-y-3 md:space-y-0 md:space-x-4">
            <Link to="/appointments" className="bg-white text-sudan-green hover:bg-gray-100 px-6 py-3 rounded-md font-medium flex items-center cursor-pointer">
              <i className="fa-solid fa-calendar-check mr-2" />
              Book Appointment
            </Link>
            <Link to="/consular-services" className="bg-sudan-black text-white hover:bg-gray-800 px-6 py-3 rounded-md font-medium flex items-center cursor-pointer">
              <i className="fa-solid fa-passport mr-2" />
              Consular Services
            </Link>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center p-8">
          <div className="flex space-x-4">
            <div className="h-64 w-48 bg-sudan-green rounded-md shadow-lg -rotate-6" />
            <div className="h-64 w-48 bg-sudan-white rounded-md shadow-lg" />
            <div className="h-64 w-48 bg-sudan-black rounded-md shadow-lg rotate-6" />
          </div>
        </div>
      </div>
    </div>
  )
}



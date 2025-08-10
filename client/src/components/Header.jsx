import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header id="header" className="bg-sudan-green text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-2 px-4 border-b border-white/20 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center"><i className="fa-solid fa-phone w-4" /><span className="ml-2">+40 21 123 4567</span></div>
            <div className="flex items-center"><i className="fa-solid fa-envelope w-4" /><span className="ml-2">info@sudanembassy.ro</span></div>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-gray-200">English</span>
            <span className="cursor-pointer hover:text-gray-200">Romanian</span>
            <span className="cursor-pointer hover:text-gray-200 font-arabic">العربية</span>
            <div className="flex items-center gap-2 ml-4">
              <span className="hover:text-gray-200 cursor-pointer"><i className="fa-brands fa-facebook-f" /></span>
              <span className="hover:text-gray-200 cursor-pointer"><i className="fa-brands fa-twitter" /></span>
              <span className="hover:text-gray-200 cursor-pointer"><i className="fa-brands fa-instagram" /></span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-sudan-green">
              <i className="fa-solid fa-landmark text-lg" />
            </div>
            <div>
              <div className="font-medium text-white text-lg">Embassy of Sudan</div>
              <div className="text-xs text-white/80">Bucharest, Romania</div>
            </div>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex gap-6">
              <li className="relative group">
                <NavLink to="/" className="py-2 flex items-center font-medium cursor-pointer">Home</NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/consular-services" className="py-2 flex items-center font-medium cursor-pointer">Consular Services</NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/appointments" className="py-2 flex items-center font-medium cursor-pointer">Appointments</NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/news" className="py-2 flex items-center font-medium cursor-pointer">News &amp; Alerts</NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/about-sudan" className="py-2 flex items-center font-medium cursor-pointer">About Sudan</NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/contact" className="py-2 flex items-center font-medium cursor-pointer">Contact</NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/appointments" className="bg-sudan-black hover:bg-gray-800 text-white px-4 py-2 rounded flex items-center">
              <i className="fa-solid fa-calendar-check mr-2" />
              Book Appointment
            </Link>
            <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              <i className="fa-solid fa-bars text-white text-xl" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden px-4 pb-4">
            <ul className="space-y-2">
              <li><NavLink onClick={() => setOpen(false)} to="/" className="block py-2">Home</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/consular-services" className="block py-2">Consular Services</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/appointments" className="block py-2">Appointments</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/news" className="block py-2">News &amp; Alerts</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/about-sudan" className="block py-2">About Sudan</NavLink></li>
              <li><NavLink onClick={() => setOpen(false)} to="/contact" className="block py-2">Contact</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}



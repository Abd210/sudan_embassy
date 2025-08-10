export default function Footer() {
  return (
    <footer id="footer" className="bg-sudan-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Embassy of Sudan</h3>
            <p className="mb-4">123 Diplomatic Street, Sector 1<br />Bucharest, Romania</p>
            <div className="flex items-center mb-2"><i className="fa-solid fa-phone w-5" /><span className="ml-2">+40 21 123 4567</span></div>
            <div className="flex items-center"><i className="fa-solid fa-envelope w-5" /><span className="ml-2">info@sudanembassy.ro</span></div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home','Consular Services','Book Appointment','News & Alerts','Contact Us'].map((t) => (
                <li key={t}><span className="hover:text-gray-300 cursor-pointer">{t}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Popular Services</h3>
            <ul className="space-y-2">
              {['Passport Renewal','Visa Applications','Document Authentication','National Number','Emergency Travel Document'].map((t) => (
                <li key={t}><span className="hover:text-gray-300 cursor-pointer">{t}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {['facebook-f','twitter','instagram','youtube'].map((brand) => (
                <span key={brand} className="bg-white text-sudan-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  <i className={`fa-brands fa-${brand}`} />
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sudan-green" />
              <div className="w-8 h-8 bg-white" />
              <div className="w-8 h-8 bg-sudan-black" />
              <div className="w-8 h-8 bg-sudan-blue" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>© 2023 Embassy of the Republic of Sudan in Bucharest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



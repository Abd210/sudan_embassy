function Hours() {
  return (
    <div className="bg-sudan-green text-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-medium mb-4">Embassy Hours</h3>
      <ul className="space-y-2">
        <li className="flex justify-between"><span>Monday - Thursday</span><span>9:00 AM - 4:00 PM</span></li>
        <li className="flex justify-between"><span>Friday</span><span>9:00 AM - 1:00 PM</span></li>
        <li className="flex justify-between"><span>Saturday - Sunday</span><span>Closed</span></li>
      </ul>
      <div className="mt-4 pt-4 border-t border-white/30">
        <h4 className="font-medium mb-2">Consular Section</h4>
        <p>Applications accepted: 10:00 AM - 1:00 PM</p>
        <p>Document collection: 2:00 PM - 3:30 PM</p>
      </div>
    </div>
  )
}

function Contacts() {
  const rows = [
    ['fa-solid fa-location-dot','123 Diplomatic Street, Sector 1, Bucharest, Romania'],
    ['fa-solid fa-phone','+40 21 123 4567'],
    ['fa-solid fa-fax','+40 21 123 4568'],
    ['fa-solid fa-envelope','consular@sudanembassy.ro'],
    ['fa-solid fa-envelope','info@sudanembassy.ro'],
  ]
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-medium mb-4">Contact Information</h3>
      <div className="space-y-3">
        {rows.map(([icon, text]) => (
          <div key={icon+text} className="flex items-start">
            <i className={`${icon} w-5 text-sudan-green mt-1`} />
            <span className="ml-2">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Emergency() {
  return (
    <div className="bg-sudan-black text-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-medium mb-4">Emergency Contact</h3>
      <p className="mb-4">For emergencies outside regular working hours:</p>
      <div className="bg-white/10 rounded-md p-4 mb-4">
        <div className="flex items-center mb-2">
          <i className="fa-solid fa-phone-volume w-5" />
          <span className="ml-2">+40 722 123 456</span>
        </div>
        <p className="text-sm text-white/80">This number is for genuine emergencies only</p>
      </div>
      <span className="bg-sudan-blue text-white hover:bg-blue-800 px-4 py-2 rounded-md font-medium flex items-center justify-center w-full cursor-pointer">
        <i className="fa-solid fa-info-circle mr-2" />
        Emergency Guidelines
      </span>
    </div>
  )
}

export default function InfoGrids() {
  return (
    <section id="info-section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Hours />
        <Contacts />
        <Emergency />
      </div>
    </section>
  )
}



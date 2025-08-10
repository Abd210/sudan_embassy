import { useEffect, useState } from 'react'

function ServiceCard({ color, icon, title, desc }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className={`${color} text-white rounded-full h-12 w-12 flex items-center justify-center mb-4`}>
        <i className={icon + ' text-xl'} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <a href="/consular-services" className="text-sudan-blue hover:underline flex items-center cursor-pointer">
        Learn more
        <i className="fa-solid fa-arrow-right ml-2" />
      </a>
    </div>
  )
}

export default function Services() {
  const [services, setServices] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/api/consular-services').then(r=>r.json()).then((list)=>{
      setServices(list.map((s)=>({
        color: s.icon?.includes('black')? 'bg-sudan-black' : s.icon?.includes('blue')? 'bg-sudan-blue' : 'bg-sudan-green',
        icon: s.icon || 'fa-solid fa-passport',
        title: s.name,
        desc: s.details,
        image: s.image
      })))
    })
  }, [])

  return (
    <section id="services-section">
      <h2 className="text-2xl font-bold text-sudan-black mb-4">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </section>
  )
}



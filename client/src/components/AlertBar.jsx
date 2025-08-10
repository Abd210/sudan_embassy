import { useEffect, useState } from 'react'

export default function AlertBar() {
  const [open, setOpen] = useState(true)
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('info')
  useEffect(()=>{
    fetch('http://localhost:3000/api/alerts').then(r=>r.json()).then((list)=>{
      const active = list.find(a=>a.active)
      if (active) { setMessage(active.message); setLevel(active.level); setOpen(true) }
    })
  }, [])
  if (!open) return null
  return (
    <div id="alert-section" className={`py-3 text-white ${level==='warning' ? 'bg-yellow-600' : level==='danger' ? 'bg-red-700' : 'bg-sudan-black'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-solid fa-triangle-exclamation text-yellow-400 mr-3 text-xl" />
            <div>
              <span className="font-bold">IMPORTANT NOTICE:</span>
              <span className="ml-2">{message || 'No active alerts'}</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white hover:text-gray-300" aria-label="Dismiss alert">
            <i className="fa-solid fa-times" />
          </button>
        </div>
      </div>
    </div>
  )
}



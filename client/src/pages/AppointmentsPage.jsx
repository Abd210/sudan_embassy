const API_BASE = 'http://localhost:3000'

export default function AppointmentsPage() {
  async function submit(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    await fetch(`${API_BASE}/api/appointments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    e.currentTarget.reset()
    alert('Appointment submitted')
  }
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sudan-black mb-6">Book Appointment</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-700 mb-4">Choose a service and preferred date.</p>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" className="w-full border rounded px-3 py-2" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" className="w-full border rounded px-3 py-2" placeholder="name@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service</label>
            <select name="service" className="w-full border rounded px-3 py-2" required>
              <option>Passport Services</option>
              <option>Visa Applications</option>
              <option>Document Authentication</option>
              <option>National Number</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Date</label>
            <input name="date" type="date" className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea name="notes" className="w-full border rounded px-3 py-2" rows="4" placeholder="Any additional info" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="bg-sudan-green text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}



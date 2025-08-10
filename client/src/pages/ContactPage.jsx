export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sudan-black mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
          <div className="flex items-start"><i className="fa-solid fa-location-dot w-6 text-sudan-green mt-1" /><span className="ml-2">123 Diplomatic Street, Sector 1, Bucharest, Romania</span></div>
          <div className="flex items-center"><i className="fa-solid fa-phone w-6 text-sudan-green" /><span className="ml-2">+40 21 123 4567</span></div>
          <div className="flex items-center"><i className="fa-solid fa-envelope w-6 text-sudan-green" /><span className="ml-2">info@sudanembassy.ro</span></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full border rounded px-3 py-2" rows="5" placeholder="How can we help?" />
            </div>
            <button className="bg-sudan-green text-white px-6 py-2 rounded hover:bg-green-700">Send</button>
          </form>
        </div>
      </div>
    </main>
  )
}



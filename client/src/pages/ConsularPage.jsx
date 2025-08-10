export default function ConsularPage() {
  const items = [
    { title: 'Passport Services', desc: 'Renewal, replacement, and new passport applications for Sudanese citizens.' },
    { title: 'Visa Applications', desc: 'Tourist, business, and other visa types for travel to Sudan.' },
    { title: 'Document Authentication', desc: 'Legalization and authentication of official documents.' },
    { title: 'National Number', desc: 'Apply for your National Number and related services.' },
  ]
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sudan-black mb-6">Consular Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((s) => (
          <div key={s.title} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2">{s.title}</h3>
            <p className="text-gray-600 mb-4">{s.desc}</p>
            <button className="text-sudan-blue hover:underline">Learn more</button>
          </div>
        ))}
      </div>
    </main>
  )
}



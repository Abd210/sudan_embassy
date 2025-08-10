function FormRow({ color, title, meta }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 flex items-center hover:bg-gray-50">
      <div className={`${color} text-white rounded-full h-10 w-10 flex items-center justify-center mr-4`}>
        <i className="fa-solid fa-file-pdf" />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{meta}</p>
      </div>
      <span className="text-sudan-blue hover:text-blue-700 cursor-pointer">
        <i className="fa-solid fa-download" />
      </span>
    </div>
  )
}

export default function Forms() {
  const data = [
    ['bg-sudan-green','Passport Renewal Form','PDF, 2 pages, 256KB'],
    ['bg-sudan-blue','Visa Application Form','PDF, 3 pages, 320KB'],
    ['bg-sudan-black','Authentication Request Form','PDF, 1 page, 180KB'],
    ['bg-sudan-green','National Number Application','PDF, 2 pages, 240KB'],
  ]
  return (
    <section id="forms-section">
      <h2 className="text-2xl font-bold text-sudan-black mb-4">Forms &amp; Downloads</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map(([color, title, meta]) => (
            <FormRow key={title} color={color} title={title} meta={meta} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-sudan-blue hover:underline cursor-pointer">View all forms and documents</span>
        </div>
      </div>
    </section>
  )
}



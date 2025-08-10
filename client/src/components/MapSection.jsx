export default function MapSection() {
  return (
    <section id="map-section">
      <h2 className="text-2xl font-bold text-sudan-black mb-4">Location &amp; Directions</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 h-[400px] relative">
        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1d23e58256-b13651d2c5a8a833610e.png" alt="map of Bucharest with location pin" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-2">Embassy of Sudan in Bucharest</h3>
            <p className="text-gray-600 mb-4">123 Diplomatic Street, Sector 1, Bucharest, Romania</p>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Public Transportation</h4>
              <div className="flex items-center mb-1">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">M</div>
                <span>Metro Line M2, Station: University Square</span>
              </div>
              <div className="flex items-center">
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">B</div>
                <span>Bus Lines: 336, 381 (Stop: Diplomatic Street)</span>
              </div>
            </div>
            <span className="bg-sudan-green text-white hover:bg-green-800 px-4 py-2 rounded-md font-medium flex items-center justify-center w-full cursor-pointer">
              <i className="fa-solid fa-directions mr-2" />
              Get Directions
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}



function StatusCard({ color, icon, title, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
      <div className={`${color} text-white rounded-full p-3 mr-4`}>
        <i className={icon} />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-600">{subtitle}</div>
      </div>
    </div>
  )
}

export default function StatusBar() {
  return (
    <div id="status-bar" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatusCard color="bg-sudan-green" icon="fa-solid fa-clock" title="Embassy Status" subtitle="Open today: 9:00 AM - 4:00 PM" />
      <StatusCard color="bg-sudan-blue" icon="fa-solid fa-bell" title="Holiday Notice" subtitle="Closed on August 15 (Romanian Holiday)" />
      <StatusCard color="bg-sudan-black" icon="fa-solid fa-calendar-alt" title="Next Available Appointment" subtitle="August 18, 2023" />
    </div>
  )
}



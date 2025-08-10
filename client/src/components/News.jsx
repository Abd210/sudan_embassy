import { useEffect, useState } from 'react'

function NewsCard({ tagColor, tagLabel, date, title, summary, image, alt }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        <img className="w-full h-full object-cover" src={image} alt={alt} />
        <div className={`${tagColor} text-white text-xs px-2 py-1 rounded absolute top-2 left-2`}>{tagLabel}</div>
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-500">{date}</span>
        <h3 className="text-lg font-medium my-2">{title}</h3>
        <p className="text-gray-600 mb-3">{summary}</p>
        <span className="text-sudan-blue hover:underline flex items-center cursor-pointer">
          Read more
          <i className="fa-solid fa-arrow-right ml-2" />
        </span>
      </div>
    </div>
  )
}

export default function News() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/api/news').then(r=>r.json()).then((list)=>{
      setPosts(list.map(n => ({
        tagColor: n.tag === 'Official' ? 'bg-sudan-green' : 'bg-sudan-blue',
        tagLabel: n.tag || 'Update',
        date: new Date(n.createdAt).toLocaleDateString(),
        title: n.title,
        summary: n.summary,
        image: n.image,
        alt: n.title
      })))
    })
  }, [])

  return (
    <section id="news-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sudan-black">Latest News & Announcements</h2>
        <span className="text-sudan-blue hover:underline cursor-pointer">View All</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {posts.map((p) => (
          <NewsCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}



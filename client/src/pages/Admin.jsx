import { useEffect, useState } from 'react'
import { uploadToStorage } from '../lib/storage'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { PageToaster, Field, TextInput, TextArea, Button } from '../components/UI'
import Upload from '../components/Upload'
import AdminLogin from './AdminLogin'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'

const API_BASE = 'http://localhost:3000'

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed')
  return res.json()
}

export default function AdminPage() {
  const [me, setMe] = useState({ authenticated: false })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ username: '', password: '' })
  const [cred, setCred] = useState({ username: '', password: '' })

  useEffect(() => {
    api('/api/me')
      .then(setMe)
      .catch(() => setMe({ authenticated: false }))
      .finally(() => setLoading(false))
  }, [])

  async function login(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/login', { method: 'POST', body: JSON.stringify(form) })
      const meNow = await api('/api/me')
      setMe(meNow)
    } catch (err) {
      setError(err.message)
    }
  }

  async function logout() {
    await api('/api/logout', { method: 'POST' })
    setMe({ authenticated: false })
  }

  async function updateCreds(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/api/admin/credentials', { method: 'POST', body: JSON.stringify(cred) })
      setCred({ username: '', password: '' })
      alert('Credentials updated')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-10">Loading...</div>

  if (!me.authenticated) {
    return <AdminLogin onAuthed={() => setMe({ authenticated: true })} />
  }

  return (
    <main className="container mx-auto px-4 py-10 space-y-6">
      <PageToaster />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-sudan-black">Admin Dashboard</h1>
        <button className="bg-sudan-black text-white px-4 py-2 rounded" onClick={()=>{ logout(); signOut(auth).catch(()=>{}) }}>Logout</button>
      </div>

      <AdminTabs />
    </main>
  )
}

function FileInput({ onChange }) {
  return <input type="file" className="w-full" onChange={(e)=>onChange(e.target.files?.[0]||null)} />
}

function ConsularForm() {
  const schema = z.object({ name: z.string().min(2), icon: z.string().min(1), details: z.string().min(5) })
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { name: '', icon: 'fa-solid fa-passport', details: '' } })
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const onSubmit = handleSubmit(async (values) => {
    let image = null
    if (file) {
      const { downloadURL } = await uploadToStorage('consular', file, setProgress)
      image = downloadURL
    }
    const token = localStorage.getItem('fbToken') || ''
    await fetch(`${API_BASE}/api/consular-services`, { method: 'POST', headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify({ ...values, image }) })
    reset(); setFile(null); setProgress(0)
    toast.success('Service saved')
  })

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Field label="Name">
        <TextInput {...register('name')} />
        {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name.message}</div>}
      </Field>
      <Field label="Icon (Font Awesome class)">
        <TextInput {...register('icon')} />
        {errors.icon && <div className="text-red-600 text-xs mt-1">{errors.icon.message}</div>}
      </Field>
      <Field label="Details">
        <TextArea rows={4} {...register('details')} />
        {errors.details && <div className="text-red-600 text-xs mt-1">{errors.details.message}</div>}
      </Field>
      <Field label="Image (optional)">
        <Upload onFile={setFile} />
        {progress>0 && <div className="text-sm text-gray-600 mt-1">Upload: {progress}%</div>}
      </Field>
      <Button disabled={isSubmitting}>{isSubmitting? 'Saving...' : 'Save'}</Button>
    </form>
  )
}

function withTokenHeaders(init={}){
  const token = localStorage.getItem('fbToken') || ''
  return { ...init, headers: { ...(init.headers||{}), Authorization: `Bearer ${token}` } }
}

function useAdminList(path){
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}${path}`, withTokenHeaders()).then(r=>r.json()).then(setItems) }, [])
  return [items, setItems]
}

function NewsForm() {
  const schema = z.object({ title: z.string().min(3), summary: z.string().min(10), tag: z.string().min(2) })
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { title:'', summary:'', tag:'Official' } })
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const onSubmit = handleSubmit(async (values)=>{
    let image = null
    if (file) { const { downloadURL } = await uploadToStorage('news', file, setProgress); image = downloadURL }
    const token = localStorage.getItem('fbToken') || ''
    await fetch(`${API_BASE}/api/news`, { method: 'POST', headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify({ ...values, image }) })
    reset(); setFile(null); setProgress(0)
    toast.success('News published')
  })
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Field label="Title"><TextInput {...register('title')} />{errors.title && <div className="text-red-600 text-xs mt-1">{errors.title.message}</div>}</Field>
      <Field label="Summary"><TextArea rows={3} {...register('summary')} />{errors.summary && <div className="text-red-600 text-xs mt-1">{errors.summary.message}</div>}</Field>
      <Field label="Tag"><TextInput {...register('tag')} />{errors.tag && <div className="text-red-600 text-xs mt-1">{errors.tag.message}</div>}</Field>
      <Field label="Image"><Upload onFile={setFile} />{progress>0 && <div className="text-sm text-gray-600 mt-1">Upload: {progress}%</div>}</Field>
      <Button className="bg-sudan-blue hover:bg-blue-800" disabled={isSubmitting}>{isSubmitting? 'Publishing...' : 'Publish'}</Button>
    </form>
  )
}

function AlertsForm() {
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('info')
  async function submit(e){
    e.preventDefault()
    await fetch(`${API_BASE}/api/alerts`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, level }) })
    setMessage(''); setLevel('info')
    alert('Alert created')
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <input className="w-full border rounded px-3 py-2" value={message} onChange={(e)=>setMessage(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Level</label>
        <select className="w-full border rounded px-3 py-2" value={level} onChange={(e)=>setLevel(e.target.value)}>
          <option value="info">info</option>
          <option value="warning">warning</option>
          <option value="danger">danger</option>
        </select>
      </div>
      <button className="bg-sudan-black text-white px-6 py-2 rounded">Create Alert</button>
    </form>
  )
}

function AppointmentsList() {
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/appointments`, { credentials: 'include', headers: { Authorization: `Bearer ${localStorage.getItem('fbToken')||''}` } }).then(r=>r.json()).then(setItems) }, [])
  return (
    <div className="space-y-2 max-h-[360px] overflow-auto">
      {items.map((a)=> (
        <div key={a.id} className="border rounded p-3 text-sm">
          <div className="font-medium">{a.service} — {a.name}</div>
          <div className="text-gray-600">{a.email} • {a.date}</div>
          {a.notes && <div className="text-gray-700 mt-1">{a.notes}</div>}
        </div>
      ))}
      {items.length===0 && <div className="text-gray-500">No appointments yet.</div>}
    </div>
  )
}

function ConsularList(){
  const [items, setItems] = useAdminList('/api/consular-services')
  async function remove(id){
    await fetch(`${API_BASE}/api/consular-services/${id}`, withTokenHeaders({ method: 'DELETE' }))
    setItems(items.filter(i=>i.id!==id))
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Services List</h2>
      <div className="space-y-2 max-h-[360px] overflow-auto">
        {items.map(i=> (
          <div key={i.id} className="flex items-center justify-between border rounded p-3 text-sm">
            <div className="flex items-center gap-2"><i className={`${i.icon} w-5`} /><span className="font-medium">{i.name}</span></div>
            <button className="text-red-600" onClick={()=>remove(i.id)}>Delete</button>
          </div>
        ))}
        {items.length===0 && <div className="text-gray-500">No services yet.</div>}
      </div>
    </div>
  )
}

function NewsList(){
  const [items, setItems] = useAdminList('/api/news')
  async function remove(id){
    await fetch(`${API_BASE}/api/news/${id}`, withTokenHeaders({ method: 'DELETE' }))
    setItems(items.filter(i=>i.id!==id))
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">News List</h2>
      <div className="space-y-2 max-h-[360px] overflow-auto">
        {items.map(i=> (
          <div key={i.id} className="flex items-center justify-between border rounded p-3 text-sm">
            <div className="font-medium">{i.title}</div>
            <button className="text-red-600" onClick={()=>remove(i.id)}>Delete</button>
          </div>
        ))}
        {items.length===0 && <div className="text-gray-500">No news yet.</div>}
      </div>
    </div>
  )
}

function AlertsList(){
  const [items, setItems] = useAdminList('/api/alerts')
  async function remove(id){
    await fetch(`${API_BASE}/api/alerts/${id}`, withTokenHeaders({ method: 'DELETE' }))
    setItems(items.filter(i=>i.id!==id))
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Alerts List</h2>
      <div className="space-y-2 max-h-[360px] overflow-auto">
        {items.map(i=> (
          <div key={i.id} className="flex items-center justify-between border rounded p-3 text-sm">
            <div>{i.message}</div>
            <button className="text-red-600" onClick={()=>remove(i.id)}>Delete</button>
          </div>
        ))}
        {items.length===0 && <div className="text-gray-500">No alerts yet.</div>}
      </div>
    </div>
  )
}

function AdminTabs(){
  const tabs = ['Services','News','Alerts','Appointments','Settings']
  const [active, setActive] = useState('Services')
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-4">
        <nav className="flex flex-wrap">
          {tabs.map(t => (
            <button key={t} className={`py-3 px-4 -mb-px border-b-2 ${active===t ? 'border-sudan-green text-sudan-green' : 'border-transparent text-gray-600'}`} onClick={() => setActive(t)}>{t}</button>
          ))}
        </nav>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {active==='Services' && (<>
          <div className="col-span-1"><h2 className="text-xl font-semibold mb-4">Create Consular Service</h2><ConsularForm /></div>
          <div className="col-span-1"><ConsularList /></div>
        </>)}
        {active==='News' && (<>
          <div className="col-span-1"><h2 className="text-xl font-semibold mb-4">Create News</h2><NewsForm /></div>
          <div className="col-span-1"><NewsList /></div>
        </>)}
        {active==='Alerts' && (<>
          <div className="col-span-1"><h2 className="text-xl font-semibold mb-4">Create Alert</h2><AlertsForm /></div>
          <div className="col-span-1"><AlertsList /></div>
        </>)}
        {active==='Appointments' && (<>
          <div className="col-span-1 lg:col-span-2"><h2 className="text-xl font-semibold mb-4">Appointments</h2><AppointmentsListAdvanced /></div>
        </>)}
        {active==='Settings' && (<>
          <div className="col-span-1 lg:col-span-2"><h2 className="text-xl font-semibold mb-4">Site Settings</h2><SettingsForm /></div>
        </>)}
      </div>
    </div>
  )
}

function AppointmentsListAdvanced(){
  const [items, setItems] = useAdminList('/api/appointments')
  async function setStatus(id, status){
    await fetch(`${API_BASE}/api/appointments/${id}`, withTokenHeaders({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }))
    setItems(items.map(i=> i.id===id ? { ...i, status } : i))
  }
  return (
    <div className="space-y-2 max-h-[480px] overflow-auto">
      {items.map((a)=> (
        <div key={a.id} className="border rounded p-3 text-sm flex items-center justify-between">
          <div>
            <div className="font-medium">{a.service} — {a.name}</div>
            <div className="text-gray-600">{a.email} • {a.date}</div>
            {a.notes && <div className="text-gray-700 mt-1">{a.notes}</div>}
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs ${a.status==='approved'?'bg-green-100 text-green-700':a.status==='rejected'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
            <button className="text-sudan-green" onClick={()=>setStatus(a.id,'approved')}>Approve</button>
            <button className="text-red-600" onClick={()=>setStatus(a.id,'rejected')}>Reject</button>
          </div>
        </div>
      ))}
      {items.length===0 && <div className="text-gray-500">No appointments yet.</div>}
    </div>
  )
}

function SettingsForm(){
  const [settings, setSettings] = useState({
    header: { phone: '+40 21 123 4567', email: 'info@sudanembassy.ro' },
    hero: { title: 'Embassy of the Republic of Sudan', subtitle: 'Bucharest, Romania', cta1: 'Book Appointment', cta2: 'Consular Services' },
    hours: { monThu: '9:00 AM - 4:00 PM', fri: '9:00 AM - 1:00 PM' },
  })
  useEffect(()=>{ fetch(`${API_BASE}/api/settings`).then(r=>r.json()).then((d)=> d && setSettings(s=>({ ...s, ...d }))) },[])
  async function save(e){ e.preventDefault(); await fetch(`${API_BASE}/api/settings`, withTokenHeaders({ method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(settings) })); alert('Saved settings') }
  return (
    <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Header</h3>
        <label className="block text-sm mb-1">Phone</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={settings.header.phone} onChange={(e)=>setSettings(s=>({...s, header:{...s.header, phone:e.target.value}}))} />
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full border rounded px-3 py-2" value={settings.header.email} onChange={(e)=>setSettings(s=>({...s, header:{...s.header, email:e.target.value}}))} />
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-semibold mb-2">Hero</h3>
        <label className="block text-sm mb-1">Title</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={settings.hero.title} onChange={(e)=>setSettings(s=>({...s, hero:{...s.hero, title:e.target.value}}))} />
        <label className="block text-sm mb-1">Subtitle</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={settings.hero.subtitle} onChange={(e)=>setSettings(s=>({...s, hero:{...s.hero, subtitle:e.target.value}}))} />
        <label className="block text-sm mb-1">CTA 1</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={settings.hero.cta1} onChange={(e)=>setSettings(s=>({...s, hero:{...s.hero, cta1:e.target.value}}))} />
        <label className="block text-sm mb-1">CTA 2</label>
        <input className="w-full border rounded px-3 py-2" value={settings.hero.cta2} onChange={(e)=>setSettings(s=>({...s, hero:{...s.hero, cta2:e.target.value}}))} />
      </div>
      <div className="bg-gray-50 p-4 rounded md:col-span-2">
        <h3 className="font-semibold mb-2">Hours</h3>
        <label className="block text-sm mb-1">Mon-Thu</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={settings.hours.monThu} onChange={(e)=>setSettings(s=>({...s, hours:{...s.hours, monThu:e.target.value}}))} />
        <label className="block text-sm mb-1">Fri</label>
        <input className="w-full border rounded px-3 py-2" value={settings.hours.fri} onChange={(e)=>setSettings(s=>({...s, hours:{...s.hours, fri:e.target.value}}))} />
      </div>
      <div className="md:col-span-2 flex justify-end"><button className="bg-sudan-green text-white px-6 py-2 rounded">Save Settings</button></div>
    </form>
  )
}



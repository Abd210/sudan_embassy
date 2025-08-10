const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { db, bucket, verifyIdToken } = require('./firebaseAdmin');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic in-memory credential store (can be changed via admin endpoint)
const credentials = {
  username: 'embassy',
  password: '123',
}

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'replace_this_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  })
);

// Upload directory (local dev: server/uploads; Cloud Run: /tmp/uploads)
const isCloudRun = !!process.env.K_SERVICE;
const uploadDir = process.env.UPLOAD_DIR || (isCloudRun ? '/tmp/uploads' : path.join(__dirname, 'uploads'));
fs.mkdirSync(uploadDir, { recursive: true });

// Serve uploaded files
app.use('/media', express.static(uploadDir));

// Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = (file.originalname || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uuidv4()}-${safe}`);
  },
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.json({ message: 'API up' });
});

// Server-side upload to local disk (/media/*) to avoid client-side CORS
app.post('/api/upload', requireAnyAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file is required' });
    const filename = path.basename(req.file.filename);
    const mediaPath = `/media/${filename}`;
    const url = `${req.protocol}://${req.get('host')}${mediaPath}`;
    res.json({ ok: true, url, path: mediaPath });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Firebase-authenticated middleware (Bearer token from client). Not used yet on frontend
async function requireFirebaseAuth(req, res, next) {
  const decoded = await verifyIdToken(req.headers.authorization)
  if (!decoded) return res.status(401).json({ error: 'Unauthorized' })
  req.user = decoded
  next()
}

async function requireAnyAuth(req, res, next) {
  if (req.session && req.session.user) return next()
  const decoded = await verifyIdToken(req.headers.authorization)
  if (decoded) { req.user = decoded; return next() }
  return res.status(401).json({ error: 'Unauthorized' })
}

// (upload middleware defined above)

// Auth routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === credentials.username && password === credentials.password) {
    req.session.user = { username };
    return res.json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', (req, res) => {
  if (req.session.user) return res.json({ authenticated: true, user: req.session.user });
  return res.json({ authenticated: false });
});

// Protect middleware
function requireAuth(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Admin endpoints
app.get('/api/admin/secret', requireAuth, (req, res) => {
  res.json({ message: 'Admin data placeholder' });
});

app.post('/api/admin/credentials', requireAuth, (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  credentials.username = String(username);
  credentials.password = String(password);
  res.json({ ok: true });
});

// Consular Services CRUD (Firebase-auth protected)
app.post('/api/consular-services', requireAnyAuth, async (req, res) => {
  try {
    const id = uuidv4();
    const { name = '', icon = '', details = '', image = null } = req.body || {}
    const data = {
      id,
      name,
      icon,
      details,
      image,
      createdAt: Date.now(),
    };
    await db.collection('consularServices').doc(id).set(data);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/consular-services', async (req, res) => {
  const snap = await db.collection('consularServices').orderBy('createdAt', 'desc').get();
  res.json(snap.docs.map(d=>d.data()));
});

app.put('/api/consular-services/:id', requireAnyAuth, async (req, res) => {
  const id = req.params.id;
  await db.collection('consularServices').doc(id).set({ ...req.body, id }, { merge: true });
  res.json({ ok: true });
});

app.delete('/api/consular-services/:id', requireAnyAuth, async (req, res) => {
  await db.collection('consularServices').doc(req.params.id).delete();
  res.json({ ok: true });
});

// Appointments
app.post('/api/appointments', async (req, res) => {
  const id = uuidv4();
  const data = { id, ...req.body, createdAt: Date.now(), status: 'pending' };
  await db.collection('appointments').doc(id).set(data);
  res.json({ ok: true, data });
});

app.get('/api/appointments', requireAnyAuth, async (req, res) => {
  const snap = await db.collection('appointments').orderBy('createdAt','desc').get();
  res.json(snap.docs.map(d=>d.data()));
});

app.patch('/api/appointments/:id', requireAnyAuth, async (req, res) => {
  const id = req.params.id;
  await db.collection('appointments').doc(id).set({ ...req.body, id }, { merge: true });
  res.json({ ok: true });
});

// News
app.post('/api/news', requireAnyAuth, async (req, res) => {
  try {
    const id = uuidv4();
    const { title = '', summary = '', tag = '', image = null } = req.body || {}
    const data = { id, title, summary, tag, image, createdAt: Date.now() };
    await db.collection('news').doc(id).set(data);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/news', async (req, res) => {
  const snap = await db.collection('news').orderBy('createdAt','desc').get();
  res.json(snap.docs.map(d=>d.data()));
});

app.put('/api/news/:id', requireAnyAuth, async (req, res) => {
  const id = req.params.id;
  await db.collection('news').doc(id).set({ ...req.body, id }, { merge: true });
  res.json({ ok: true });
});

app.delete('/api/news/:id', requireAnyAuth, async (req, res) => {
  await db.collection('news').doc(req.params.id).delete();
  res.json({ ok: true });
});

// Reorder endpoints
app.put('/api/consular-services/order', requireAnyAuth, async (req, res) => {
  const { order = [] } = req.body || {};
  const batch = db.batch();
  order.forEach((id, index) => {
    batch.set(db.collection('consularServices').doc(id), { order: index }, { merge: true });
  });
  await batch.commit();
  res.json({ ok: true });
});

app.put('/api/news/order', requireAnyAuth, async (req, res) => {
  const { order = [] } = req.body || {};
  const batch = db.batch();
  order.forEach((id, index) => {
    batch.set(db.collection('news').doc(id), { order: index }, { merge: true });
  });
  await batch.commit();
  res.json({ ok: true });
});

// Site settings
const SETTINGS_DOC = 'site'
app.get('/api/settings', async (req, res) => {
  const doc = await db.collection('settings').doc(SETTINGS_DOC).get();
  res.json(doc.exists ? doc.data() : {});
});

app.put('/api/settings', requireAnyAuth, async (req, res) => {
  await db.collection('settings').doc(SETTINGS_DOC).set(req.body || {}, { merge: true });
  res.json({ ok: true });
});

// Alerts
app.post('/api/alerts', requireAnyAuth, async (req, res) => {
  const id = uuidv4();
  const data = { id, message: req.body.message || '', level: req.body.level || 'info', createdAt: Date.now(), active: true };
  await db.collection('alerts').doc(id).set(data);
  res.json({ ok: true, data });
});

app.get('/api/alerts', async (req, res) => {
  const snap = await db.collection('alerts').orderBy('createdAt','desc').get();
  res.json(snap.docs.map(d=>d.data()));
});

app.patch('/api/alerts/:id', requireAnyAuth, async (req, res) => {
  const id = req.params.id;
  await db.collection('alerts').doc(id).set({ ...req.body, id }, { merge: true });
  res.json({ ok: true });
});

app.delete('/api/alerts/:id', requireAnyAuth, async (req, res) => {
  await db.collection('alerts').doc(req.params.id).delete();
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});

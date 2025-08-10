const admin = require('firebase-admin')
const path = require('path')

let app
if (!admin.apps.length) {
  try {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '..', 'serviceAccountKey.json')
    app = admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath)),
      storageBucket: process.env.FIREBASE_BUCKET || 'sudanembassy-f0c6d.appspot.com',
    })
  } catch (err) {
    console.error('Failed to initialize Firebase Admin. Ensure serviceAccountKey.json exists at project root.', err)
    throw err
  }
}

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function verifyIdToken(authorizationHeader) {
  if (!authorizationHeader) return null
  const parts = authorizationHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  const token = parts[1]
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    return decoded
  } catch (e) {
    return null
  }
}

module.exports = { admin, db, bucket, verifyIdToken }



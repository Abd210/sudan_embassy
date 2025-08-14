// Firebase client initialization
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB_itJmMpaFYG_4HYJT3ixIAcbzZvD6rx8',
  authDomain: 'sudanembassy-f0c6d.firebaseapp.com',
  projectId: 'sudanembassy-f0c6d',
  // Use the bucket in appspot.com form for client SDK
  storageBucket: 'sudanembassy-f0c6d.appspot.com',
  messagingSenderId: '967779417840',
  appId: '1:967779417840:web:2fedaeae597015c133cc35',
  measurementId: 'G-HG19RZYTG6',
}

export const firebaseApp = initializeApp(firebaseConfig)

// Initialize Analytics in supported environments (e.g., browser, https/localhost)
export let analytics = undefined
export const auth = getAuth(firebaseApp)
if (typeof window !== 'undefined') {
  isSupported()
    .then((ok) => {
      if (ok) {
        analytics = getAnalytics(firebaseApp)
      }
    })
    .catch(() => {})

  // Keep an up-to-date ID token for authenticated admin actions
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const token = await user.getIdToken()
        localStorage.setItem('fbToken', token)
      } else {
        localStorage.removeItem('fbToken')
      }
    } catch {}
  })
}

export default firebaseApp



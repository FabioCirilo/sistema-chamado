import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBMKBUtmN90_x0GstxNVOewczSJhofxai0',
  authDomain: 'chamadoflow.firebaseapp.com',
  projectId: 'chamadoflow',
  storageBucket: 'chamadoflow.firebasestorage.app',
  messagingSenderId: '549053912975',
  appId: '1:549053912975:web:f0d675451e94023a0f5dfa',
  measurementId: 'G-X12860JFDT'
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }

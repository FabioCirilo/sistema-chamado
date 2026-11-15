import { createContext, useState } from 'react'
import { db, auth } from '../services/firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const navigate = useNavigate()

  async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async value => {
        let uid = value.user.uid

        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)

        let data = {
          uid: uid,
          name: docSnap.data().name,
          avatarUrl: docSnap.data().avatarUrl,
          email: value.user.email
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success('Bem-vindo(a) de volta!')
        navigate('/dashboard')
      })
      .catch(err => {
        console.log(err)
        setLoadingAuth(false)
        toast.error('Ops! erro ao fazer o login')
      })
  }

  //Cadastrar novo user
  async function signUp(name, email, password) {
    setLoadingAuth(true)
    await createUserWithEmailAndPassword(auth, email, password).then(
      async value => {
        let uid = value.user.uid

        await setDoc(doc(db, 'users', uid), {
          name: name,
          avatarUrl: null
        })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              avatarUrl: null,
              email: value.user.email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Seja bem-vindo ao sistema')
            navigate('/dashboard')
          })
          .catch(err => {
            console.log(err)
            setLoadingAuth(false)
          })
      }
    )
  }

  function storageUser(data) {
    localStorage.setItem('@sticketPro', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //false
        user,
        signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

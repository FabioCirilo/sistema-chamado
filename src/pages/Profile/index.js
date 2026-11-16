import { FiSettings, FiUpload, FiSave } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import './profile.css'
import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function Profile() {
  const { user, storageUser, setUser } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

  const [name, setName] = useState(user?.name || '')
  const [imageAvatar, setImageAvatar] = useState(null)

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        alert('Envia uma imagem do tipo jpeg ou png')
        setImageAvatar(null)
        return
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
      .then(snapshot => {
        getDownloadURL(snapshot.ref).then(async downloadURL => {
          let urlFoto = downloadURL

          const docRef = doc(db, 'users', user.uid)
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            name: name
          }).then(() => {
            let data = {
              ...user,
              name: name,
              avatarUrl: urlFoto
            }

            setUser(data)
            storageUser(data)
            toast.success('Atualizado com sucesso')
          })
        })
      })
      .catch(err => {
        console.log('Erro ao enviar a imagem ' + err)
      })

    return () => uploadTask
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (imageAvatar === null && name !== '') {
      // Atualizar apenas o none do user
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, {
        name: name
      })
        .then(() => {
          let data = {
            ...user,
            name: name
          }

          setUser(data)
          storageUser(data)
          toast.success('Atualizado com sucesso')
        })
        .catch(err => {
          console.log('Erro ao atualizar ' + err)
        })
    } else if (name !== '' && imageAvatar !== null) {
      // Atualizar o nome e a foto do perfil
      handleUpload()
    }
  }

  return (
    <>
      <Header />

      <main className="content">
        <Title name="Minha conta">
          <FiSettings size={24} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <div className="profile-photo">
              <div className="label-avatar">
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={handleFile}
                />
                <label htmlFor="avatar" className="upload-icon">
                  <FiUpload color="#fff" size={22} />
                </label>
                {avatarUrl === null ? (
                  <img
                    src={avatar}
                    alt="Foto de perfil"
                    width={250}
                    height={250}
                  />
                ) : (
                  <img
                    src={avatarUrl}
                    alt="Foto de perfil"
                    width={250}
                    height={250}
                  />
                )}
              </div>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  placeholder="email@exemplo.com"
                  disabled
                />
              </div>
            </div>

            <button type="submit" className="btn-save">
              <FiSave size={18} />
              Salvar alterações
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

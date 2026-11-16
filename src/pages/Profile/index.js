import { FiSettings } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'

export default function Profile() {
  return (
    <>
      <Header />

      <main className="content">
        <Title name="Minha conta">
          <FiSettings size={24} />
        </Title>

        <div className="profile-container">
          <h1>Página Perfil</h1>
        </div>
      </main>
    </>
  )
}

import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import avatarImg from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './header.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  return (
    <div className="asidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="Foto de perfil"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#fff" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#fff" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Perfil
      </Link>

      <button className="btn-sair">
        <FiLogOut size={20} />
        Terminar Sessão
      </button>
    </div>
  )
}

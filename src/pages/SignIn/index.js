import './signin.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const { signIn } = useContext(AuthContext)

  function handleSignIn(e) {
    e.preventDefault()
    if (email !== '' && password !== '') {
      signIn(email, password)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <div className="login-header">
          <h1>Bem-vindo de volta!</h1>
          <p>Entre com as suas credenciais para continuar.</p>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={e => setpassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="register-link">
          <span>Não tens uma conta?</span>
          <Link to="/register"> Cadastra-te</Link>
        </div>
      </div>
    </div>
  )
}

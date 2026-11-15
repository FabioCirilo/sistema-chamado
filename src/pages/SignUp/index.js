import { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  function handleRegister(e) {
    e.preventDefault()
    alert('Teste')
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <div className="login-header">
          <h1>Crie a sua conta!</h1>
          <p>
            Preencha os campos abaixo para criar a sua conta e começar a
            utilizar o sistema.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
          </div>
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

          <button type="submit">Cadastrar</button>
        </form>

        <div className="register-link">
          <span>Já tens uma conta?</span>
          <Link to="/"> Entrar</Link>
        </div>
      </div>
    </div>
  )
}

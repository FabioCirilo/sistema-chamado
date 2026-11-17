import { FiPlusCircle } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './new.css'
import { useState } from 'react'

export default function New() {
  const [customers, setCustomers] = useState([])

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  return (
    <>
      <Header />

      <main className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="new-container">
          <div className="new-header">
            <h2>Registar novo chamado</h2>
            <p>Preencha os dados abaixo para abrir um novo chamado.</p>
          </div>

          <form className="new-form">
            <div className="form-group">
              <label>Cliente</label>
              <select defaultValue="">
                <option value="" disabled>
                  Selecione um cliente
                </option>
                <option value="1">Mercado de teste</option>
                <option value="2">Loja de informática</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assunto</label>
              <select defaultValue={assunto}>
                <option value="" disabled>
                  Selecione o assunto
                </option>
                <option value="Suporte">Suporte</option>
                <option value="Visita Tecnica">Visita Técnica</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <div className="status-options">
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="Aberto"
                    onChange={handleOptionChange}
                    checked={status === 'Aberto'}
                  />
                  <span>Em aberto</span>
                </label>

                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="Progresso"
                    onChange={handleOptionChange}
                    checked={status === 'Progresso'}
                  />
                  <span>Em progresso</span>
                </label>

                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="Fechado"
                    onChange={handleOptionChange}
                    checked={status === 'Fechado'}
                  />
                  <span>Fechado</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={complemento}
                onChange={e => setComplemento(e.target.value)}
                placeholder="Descreva detalhadamente o problema..."
                rows="5"
              />
              <small>
                Campo opcional. Adicione informações que ajudem na resolução.
              </small>
            </div>

            <div className="form-actions">
              <button type="reset" className="btn-cancel">
                Limpar
              </button>

              <button type="submit" className="btn-submit">
                <FiPlusCircle size={18} />
                Registrar chamado
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

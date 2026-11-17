import { FiPlusCircle } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'
import './new.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

const listRef = collection(db, 'customers')
export default function New() {
  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customersSelected, setCustomersSelected] = useState(0)

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = getDocs(listRef)
        .then(snapshot => {
          let list = []

          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              nameComplet: doc.data().nameComplet
            })
          })

          if (snapshot.docs.size === 0) {
            console.log('Nenhuma empresa encontrada')
            setCustomers([{ id: '1', nameComplet: 'Freela' }])
            setLoadCustomer(false)
            return
          }

          setCustomers(list)
          setLoadCustomer(false)
        })
        .catch(err => {
          console.log('Erro ao mostrar os clientes ' + err)
          setLoadCustomer(false)
          setCustomers([{ id: '1', nameComplet: 'Freela' }])
        })

      return querySnapshot
    }

    loadCustomers()
  }, [])

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  function handleChangeCustomer(e) {
    setCustomersSelected(e.target.value)
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
              {loadCustomer ? (
                <input type="text" disabled={true} value="Carregando..." />
              ) : (
                <select
                  value={customersSelected}
                  onChange={handleChangeCustomer}
                >
                  {customers.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.nameComplet}
                      </option>
                    )
                  })}
                </select>
              )}
            </div>

            <div className="form-group">
              <label>Assunto</label>
              <select value={assunto} onChange={handleChangeSelect}>
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

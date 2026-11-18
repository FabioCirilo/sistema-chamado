import {
  FiMessageCircle,
  FiPlus,
  FiClipboard,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiEdit
} from 'react-icons/fi'

import './dashboard.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import Modal from '../../components/Modal'

const listRef = collection(db, 'chamados')
export default function Dashboard() {
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)

  const [isEmply, setIsEmply] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null)

  const emAndamento = chamados.filter(
    item => item.status === 'Progresso'
  ).length

  const concluidos = chamados.filter(item => item.status === 'Fechado').length

  const aberto = chamados.filter(item => item.status === 'Aberto').length

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnopshot = await getDocs(q)

      setChamados([])

      await updateState(querySnopshot)

      setLoading(false)
    }

    loadChamados()

    return () => {}
  }, [])

  async function updateState(querySnopshot) {
    const isCollectionEmply = querySnopshot.length === 0

    if (!isCollectionEmply) {
      let list = []

      querySnopshot.forEach(doc => {
        list.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          status: doc.data().status,
          descricao: doc.data().descricao
        })
      })

      const lastDoc = querySnopshot.docs[querySnopshot.docs.length - 1]

      setChamados(chamados => [...chamados, ...list])
      setLastDocs(lastDoc)
    } else {
      setIsEmply(true)
    }

    setLoadingMore(false)
  }

  async function handleMore() {
    setLoadingMore(true)

    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDocs),
      limit(5)
    )
    const querySnopshot = await getDocs(q)
    await updateState(querySnopshot)
  }

  if (loading) {
    return (
      <>
        <Header />

        <main className="content">
          <div className="loading-container">
            <div className="loader"></div>

            <h3>A carregar chamados...</h3>
            <p>Estamos a preparar as informações para ti.</p>
          </div>
        </main>
      </>
    )
  }

  function handleView(chamado) {
    setChamadoSelecionado(chamado)
    setModalOpen(true)
  }

  return (
    <>
      <Header />

      <main className="content">
        <Title name="Chamados">
          <FiMessageCircle size={25} />
        </Title>

        <div className="dashboard-container">
          {/* Cabeçalho */}
          <div className="dashboard-top">
            <div>
              <h2>Gestão de Chamados</h2>
              <p>Acompanhe e organize todos os seus chamados.</p>
            </div>

            <Link to="/new" className="btn-new">
              <FiPlus size={20} />
              Novo chamado
            </Link>
          </div>

          {/* Estatísticas */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon purple">
                <FiClipboard size={23} />
              </div>
              <div>
                <span>Total de chamados</span>
                <h3>{chamados.length}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">
                <FiEye size={23} />
              </div>
              <div>
                <span>Aberto</span>
                <h3>{aberto}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">
                <FiClock size={23} />
              </div>
              <div>
                <span>Em andamento</span>
                <h3>{emAndamento}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <FiCheckCircle size={23} />
              </div>
              <div>
                <span>Concluídos</span>
                <h3>{concluidos}</h3>
              </div>
            </div>
          </div>

          {/* Tabela de chamados */}
          <div className="tickets-container">
            <div className="tickets-header">
              <div>
                <h3>Lista de Chamados</h3>
                <p>Consulte e acompanhe os chamados registados.</p>
              </div>

              <span className="tickets-count">
                {' '}
                {chamados.length} chamados{' '}
              </span>
            </div>

            <div className="table-responsive">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Assunto</th>
                    <th>Status</th>
                    <th>Data de criação</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {chamados.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <div className="empty-tickets">
                          <FiMessageCircle size={42} />
                          <h3>Nenhum chamado encontrado</h3>
                          <p>
                            Ainda não existem chamados registados. Crie um novo
                            chamado para começar.
                          </p>

                          <Link to="/new" className="btn-empty">
                            <FiPlus size={18} />
                            Criar primeiro chamado
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    chamados.map(item => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.cliente}</strong>
                        </td>

                        <td>{item.assunto}</td>

                        <td>
                          <span
                            className={`status-badge ${
                              item.status === 'Aberto'
                                ? 'status-pending'
                                : item.status === 'Progresso'
                                  ? 'status-progress'
                                  : 'status-completed'
                            }`}
                          >
                            {item.status === 'Aberto'
                              ? 'Em aberto'
                              : item.status === 'Progresso'
                                ? 'Em progresso'
                                : 'Fechado'}
                          </span>
                        </td>

                        <td>
                          {item.created?.toDate
                            ? item.created.toDate().toLocaleDateString('pt-PT')
                            : new Date(item.created).toLocaleDateString(
                                'pt-PT'
                              )}
                        </td>

                        <td>
                          <div className="ticket-actions">
                            <button
                              title="Visualizar"
                              className="btn-view"
                              onClick={() => handleView(item)}
                            >
                              <FiEye size={18} />
                            </button>

                            <Link
                              to={`/new/${item.id}`}
                              title="Editar"
                              className="btn-edit"
                            >
                              <FiEdit size={18} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!loadingMore && !isEmply && (
                <div className="load-more-container">
                  <button className="btn-load-more" onClick={handleMore}>
                    Carregar mais chamados
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        chamado={chamadoSelecionado}
        onClose={() => {
          setModalOpen(false)
          setChamadoSelecionado(null)
        }}
      />
    </>
  )
}

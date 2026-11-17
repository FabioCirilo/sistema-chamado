import {
  FiMessageCircle,
  FiPlus,
  FiClipboard,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEdit,
  FiTrash2
} from 'react-icons/fi'

import './dashboard.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { Link } from 'react-router-dom'

export default function Dashboard() {
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
                <h3>0</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <FiClock size={23} />
              </div>
              <div>
                <span>Em andamento</span>
                <h3>0</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <FiCheckCircle size={23} />
              </div>
              <div>
                <span>Concluídos</span>
                <h3>0</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">
                <FiAlertCircle size={23} />
              </div>
              <div>
                <span>Pendentes</span>
                <h3>0</h3>
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

              <span className="tickets-count">0 chamados</span>
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
                  {/* Os chamados do Firestore serão apresentados aqui */}

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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

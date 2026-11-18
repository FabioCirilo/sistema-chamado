import {
  FiX,
  FiCalendar,
  FiUser,
  FiTag,
  FiFileText,
  FiActivity
} from 'react-icons/fi'
import './modal.css'

export default function Modal({ chamado, isOpen, onClose }) {
  if (!isOpen || !chamado) return null

  function formatDate(date) {
    if (!date) return 'Não informada'

    const data = date?.toDate ? date.toDate() : new Date(date)

    return data.toLocaleString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Aberto':
        return 'modal-status-open'
      case 'Progresso':
        return 'modal-status-progress'
      case 'Fechado':
        return 'modal-status-closed'
      default:
        return ''
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-subtitle">DETALHES DO CHAMADO</span>
          </div>

          <button className="modal-close" onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-status-section">
            <span>Estado atual</span>

            <span className={`modal-status ${getStatusClass(chamado.status)}`}>
              {chamado.status === 'Progresso'
                ? 'Em progresso'
                : chamado.status === 'Fechado'
                  ? 'Fechado'
                  : 'Em aberto'}
            </span>
          </div>

          <div className="modal-info-grid">
            <div className="modal-info-item">
              <div className="modal-icon">
                <FiUser />
              </div>

              <div>
                <span>Cliente</span>
                <strong>{chamado.cliente || 'Não informado'}</strong>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-icon">
                <FiTag />
              </div>

              <div>
                <span>Assunto</span>
                <strong>{chamado.assunto || 'Não informado'}</strong>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-icon">
                <FiCalendar />
              </div>

              <div>
                <span>Data de criação</span>
                <strong>{formatDate(chamado.created)}</strong>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-icon">
                <FiActivity />
              </div>

              <div>
                <span>Identificação</span>
                <strong>Não disponível</strong>
              </div>
            </div>
          </div>

          <div className="modal-description">
            <div className="modal-description-title">
              <FiFileText />
              <h3>Descrição do chamado</h3>
            </div>

            <p>{chamado.descricao || 'Nenhuma descrição foi adicionada.'}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

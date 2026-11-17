import './custumer.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser, FiSave } from 'react-icons/fi'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

export default function Customers() {
  const [name, setName] = useState('')
  const [nif, setNif] = useState('')
  const [endereco, setEndereco] = useState('')

  async function handleRegister(e) {
    e.preventDefault()

    if (name !== '' && nif !== '' && endereco !== '') {
      await addDoc(collection(db, 'customers'), {
        nameComplet: name,
        nif: nif,
        endereco: endereco
      })
        .then(() => {
          toast.success('Empresa cadastrada com sucesso')
          setName('')
          setNif('')
          setEndereco('')
        })
        .catch(err => {
          console.log('Falha ao cadastrar cliente ' + err)
        })
    }
  }

  return (
    <>
      <Header />

      <main className="content">
        <Title name="Novo Cliente">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <div className="form-header">
            <h2>Dados do Cliente</h2>
            <p>Preencha os dados abaixo para cadastrar um novo cliente.</p>
          </div>

          <form className="form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Nome do Cliente</label>
              <input
                type="text"
                placeholder="Digite o nome da empresa"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>NIF</label>
              <input
                type="text"
                placeholder="Digite o NIF do cliente"
                value={nif}
                onChange={e => setNif(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <input
                type="text"
                placeholder="Digite o endereço completo"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                <FiSave size={19} />
                Salvar Cliente
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

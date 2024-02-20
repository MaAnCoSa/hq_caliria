import { useState } from 'react';
import './App.css'
import Royal_tablet from './components/Royal_tablet';
import Modal from './components/Modal';
import './styles/Modal.css';

function App() {

  const [loginModal, setLoginModal] = useState<boolean>(true)
  if (loginModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [tableId, setTableId] = useState<string>("")
  const [tablePassword, setTablePassword] = useState<string>("")

  const login = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ table_id: tableId, table_password: tablePassword})
    }
    await fetch('https://backcaliria.vercel.app/rtlogin', requestOptions)
    .then(res => res.json())
    .then(sol => {
        if (sol.auth) {
          setLoginModal(false)
        }

    });
    console.log("Se hizo un GET")
}

  return (
    <>
      <h1>HQ Caliria</h1>
      
      {!loginModal && <Royal_tablet table_id={tableId}/> }

      {loginModal && (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2>Login</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'right',
            height: '50px',
            width: '100%',
            margin: '5px',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '20px',
              fontWeight: 'bold',
              height: '20px',
              padding: 'none',
              margin: '20px 10px'
            }}>Mesa: </p>
            <input style={{
              width: '100%',
              height: '20px',
              marginTop: '10px',
              padding: 'none'
            }} type="text" value={tableId} onChange={(event) => setTableId(event.target.value)} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'right',
            height: '50px',
            width: '100%',
            margin: '5px',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '20px',
              fontWeight: 'bold',
              height: '20px',
              padding: 'none',
              margin: '20px 10px'
            }}>Contraseña: </p>
            <input style={{
              width: '100%',
              height: '20px',
              marginTop: '10px',
              padding: 'none'
            }} type="text" value={tablePassword} onChange={(event) => setTablePassword(event.target.value)} />
          </div>
        </div>


        <button
          className='close-modal'
          onClick={() => login()} >
            CERRAR
          </button>
      </div>
      )}
    </>
  )
}

export default App

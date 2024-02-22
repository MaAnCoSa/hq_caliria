import { useState } from 'react';
import './App.css'
import Royal_tablet from './components/Royal_tablet';
import './styles/Modal.css';

function App() {

  const [loginModal, setLoginModal] = useState<boolean>(true)
  if (loginModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [tableName, setTableName] = useState<string>("")
  const [tableId, setTableId] = useState<string>("")
  const [tablePassword, setTablePassword] = useState<string>("")

  const login = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ table_name: tableName, table_password: tablePassword})
    }
    await fetch('https://backcaliria.vercel.app/rtlogin', requestOptions)
    .then(res => res.json())
    .then(sol => {
        if (sol.auth) {
          setTableId(sol.table_id)
          setLoginModal(false)
        }

    });
}

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      
      {!loginModal && (
      <>
        <h1>HQ Caliria - {tableName}</h1>
        <Royal_tablet table_id={tableId}/>
      </>
      )}

      {loginModal && (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2 style={{fontSize: '40px'}}>HQ Caliria</h2>

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
              padding: 'none',
              backgroundColor: '#000814',
              color: 'rgba(255, 255, 255, 0.87)',
              borderRadius: '3px'
            }} type="text" value={tableName} onChange={(event) => setTableName(event.target.value)} />
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
              padding: 'none',
              backgroundColor: '#000814',
              color: 'rgba(255, 255, 255, 0.87)',
              borderRadius: '3px'
            }} type="password" value={tablePassword} onChange={(event) => setTablePassword(event.target.value)} />
          </div>
          <button
            className='close-modal'
            onClick={() => login()} >
            ENTRAR
          </button>
        </div>


        
      </div>
      )}
    </div>
  )
}

export default App

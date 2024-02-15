import { useState } from 'react'
import { useEffectOnce } from 'react-use';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [rt1, setRt1] = useState(0)
  const [rt2, setRt2] = useState(0)
  const [rt3, setRt3] = useState(0)
  const [rt4, setRt4] = useState(0)
  const [rt5, setRt5] = useState(0)
  const [claveActual, setClaveActual] = useState("")
  const [messageActual, setMessageActual] = useState("")


  const [d1, setD1] = useState(0)
  const [d2, setD2] = useState(0)
  const [d3, setD3] = useState(0)
  const [d4, setD4] = useState(0)
  const [d5, setD5] = useState(0)
  const [clave, setClave] = useState("")
  const [message, setMessage] = useState("")

  useEffectOnce(() => {
    get_RT_sol()
  })

  const get_RT_sol = async () => {
    await fetch('https://backcaliria.vercel.app/rtsol')
      .then(res => res.json())
      .then(sol => {
        setRt1(sol.digit1)
        setRt2(sol.digit2)
        setRt3(sol.digit3)
        setRt4(sol.digit4)
        setRt5(sol.digit5)
        setClaveActual(sol.clave)
        setMessageActual(sol.message)

        setD1(sol.digit1)
        setD2(sol.digit2)
        setD3(sol.digit3)
        setD4(sol.digit4)
        setD5(sol.digit5)
        setClave(sol.clave)
        setMessage(sol.message)

      });
      console.log("Se hizo un GET")
  }

  const post_RT_sol = async (d1, d2, d3, d4, d5, clave, message) => {
    console.log("clave: " + clave)
    console.log("message: " + message)
    await fetch('https://backcaliria.vercel.app/rtsol',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "sol": {
            "digit1": d1,
            "digit2": d2,
            "digit3": d3,
            "digit4": d4,
            "digit5": d5,
            "clave": clave,
            "message": message
          }
        })
      }
    )
    get_RT_sol()
  }

  return (
    <>

      <h1>HQ Caliria</h1>

      <h2>Royal Tablet</h2>

      <h3>Current Combination:</h3>
      <h3 style={{fontSize: 40}}>
        {rt1}{rt2}{rt3}{rt4}{rt5}
      </h3>
      <h3>New Combination: {d1}{d2}{d3}{d4}{d5} </h3>

      <NumberInput min={0} max={9} value={d1} onChange={(event, val) => setD1(val)} />
      <NumberInput min={0} max={9} value={d2} onChange={(event, val) => setD2(val)} />
      <NumberInput min={0} max={9} value={d3} onChange={(event, val) => setD3(val)} />
      <NumberInput min={0} max={9} value={d4} onChange={(event, val) => setD4(val)} />
      <NumberInput min={0} max={9} value={d5} onChange={(event, val) => setD5(val)} />

      <div>
        <h2>Clave: </h2>
        <input type="text" value={clave} onChange={(event) => setClave(event.target.value)} />
      </div>

      <div>
        <h2>Message: </h2>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>

      <button onClick={() => post_RT_sol(d1, d2, d3, d4, d5, clave, message)}>
        SET LOCK
      </button>

    </>
  )
}

export default App

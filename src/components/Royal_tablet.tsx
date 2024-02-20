import { useState } from 'react';
import Rt_pestillo from './Rt_pestillo';
import { useEffectOnce } from 'react-use';
import { Select } from '@mui/base';


const Royal_tablet = ({ table_id }: { table_id: string }) => {
    
    const [rt1, setRt1] = useState<number>(0)
    const [rt2, setRt2] = useState<number>(0)
    const [rt3, setRt3] = useState<number>(0)
    const [rt4, setRt4] = useState<number>(0)
    const [rt5, setRt5] = useState<number>(0)
    const [claveActual, setClaveActual] = useState<string>("")
    const [messageActual, setMessageActual] = useState<string>("")


    const [d1, setD1] = useState<number>(0)
    const [d2, setD2] = useState<number>(0)
    const [d3, setD3] = useState<number>(0)
    const [d4, setD4] = useState<number>(0)
    const [d5, setD5] = useState<number>(0)
    const [clave, setClave] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    useEffectOnce(() => {
        get_RT_sol()
    })

    const get_RT_sol = async () => {
        await fetch('http://localhost:5000/rtsol')
        .then(res => res.json())
        .then(sol => {
            setRt1(sol.d1)
            setRt2(sol.d2)
            setRt3(sol.d3)
            setRt4(sol.d4)
            setRt5(sol.d5)
            setClaveActual(sol.code)
            setMessageActual(sol.msg)

            setD1(sol.d1)
            setD2(sol.d2)
            setD3(sol.d3)
            setD4(sol.d4)
            setD5(sol.d5)
            setClave(sol.code)
            setMessage(sol.msg)

        });
        console.log("Se hizo un GET")
    }

    const post_RT_sol = async (
        d1: number,
        d2: number,
        d3: number,
        d4: number,
        d5: number,
        clave: string,
        message: string
    ) => {
        console.log("clave: " + clave)
        console.log("message: " + message)
        await fetch('http://localhost:5000/rtsol',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            "sol": {
                "table_id": table_id,
                "id_comb": "Combination 1",
                "d1": d1,
                "d2": d2,
                "d3": d3,
                "d4": d4,
                "d5": d5,
                "code": clave,
                "msg": message
            }
            })
        }
        )
        get_RT_sol()
    }

    return (
        <>

      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
        fontSize: '30px',
        margin: 'none',
        marginBottom: '-5px',
        padding: 'none',
        height: '60px',
        borderRadius: '10px 10px 0 0'
      }}>Royal Tablet</h1>

      <div style={{
        border: 'solid 2px #181818',
        borderBottom: 'solid 1px #181818'
      }}>
        <p style={{
          margin: 'none',
          padding: 'none',
          fontSize: 20,
          fontWeight: 'bold'
        }}>Combinación Actual: {rt1}{rt2}{rt3}{rt4}{rt5}</p>

        <h3 style={{
          fontSize: 20
        }}>
          Mensaje: {messageActual}
        </h3>
        <h3 style={{
          fontSize: 20
        }}>
          Clave: {claveActual}
        </h3>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: 'solid 2px #181818',
        borderTop: 'solid 1px #181818',
        borderRadius: '0 0 10px 10px',
        paddingBottom: '20px',
        width: '520px'
      }}>
        <div style={{
          margin: 'none',
          padding: 'none'
        }}>
        <Rt_pestillo num={d1} setter={setD1}/>
        <Rt_pestillo num={d2} setter={setD2}/>
        <Rt_pestillo num={d3} setter={setD3}/>
        <Rt_pestillo num={d4} setter={setD4}/>
        <Rt_pestillo num={d5} setter={setD5}/>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          marginLeft: '20px',
          width: '300px'
        }}>
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
            }}>Combinacion: </p>
            <Select style={{
              width: '100%',
              height: '30px',
              marginTop: '10px',
              padding: 'none'
            }} />
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
            }}>Mensaje: </p>
            <input style={{
              width: '100%',
              height: '20px',
              marginTop: '10px',
              padding: 'none'
            }} type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
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
            }}>Clave: </p>
            <input style={{
              width: '100%',
              height: '20px',
              marginTop: '10px',
              padding: 'none'
            }} type="text" value={clave} onChange={(event) => setClave(event.target.value)} />
          </div>
          
          
          <button style={{
            margin: 'auto',
            marginTop: '30px'
          }} onClick={() => post_RT_sol(d1, d2, d3, d4, d5, clave, message)}>
            APLICAR
          </button>
        </div>
      </div>
      

    </>
    )
}
export default Royal_tablet;
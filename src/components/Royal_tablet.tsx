import { useState } from 'react';
import Rt_pestillo from './Rt_pestillo';
import { useEffectOnce } from 'react-use';
import toast, { Toaster } from 'react-hot-toast';
import { Switch } from '@mui/material';

const Royal_tablet = ({ table_id }: { table_id: string }) => {
    type comb = {
      comb_id: string,
      active: boolean,
      d1: number,
      d2: number,
      d3: number,
      d4: number,
      d5: number,
      code: string,
      msg: string
    }

    const emptyComb = {
      comb_id: "",
      active: false,
      d1: 0,
      d2: 0,
      d3: 0,
      d4: 0,
      d5: 0,
      code: "",
      msg: ""
    }  

    const [combList, setCombList] = useState<Map<string, comb>>(new Map())
    const [combOptions, setCombOptions] = useState([])
    const [selectedComb, setSelectedComb] = useState<string>("")
    const [selected, setSelected] = useState<boolean>(false)
    const [actualComb, setActualComb] = useState<any>(emptyComb)

    const [d1, setD1] = useState<number | undefined>(0)
    const [d2, setD2] = useState<number | undefined>(0)
    const [d3, setD3] = useState<number | undefined>(0)
    const [d4, setD4] = useState<number | undefined>(0)
    const [d5, setD5] = useState<number | undefined>(0)
    const [clave, setClave] = useState<string | undefined>("")
    const [message, setMessage] = useState<string | undefined>("")
    const [active, setActive] = useState<boolean | undefined>(false)

    console.log(active)


    useEffectOnce(() => {
        get_RT_sol()
    })

    const get_RT_sol = async () => {
        await fetch(`https://backcaliria.vercel.app/rtsol/${table_id}`)
        .then(res => res.json())
        .then(async (sol) => {
            const newCombList: Map<string, comb> = new Map()
            const newCombOptions: any = []
            sol.forEach((combRaw: string) => {
              const newComb = JSON.parse(combRaw)
              newCombList.set(newComb.comb_id, newComb)
              newCombOptions.push(newComb.comb_id)

            })

            setCombList(newCombList)
            setCombOptions(newCombOptions)   

        });

        setSelectedComb("")

        setActualComb(combList.get(selectedComb))
    }

    const post_RT_sol = async (
        active: any,
        d1: any,
        d2: any,
        d3: any,
        d4: any,
        d5: any,
        clave: any,
        message: any
    ) => {
      try {
        await fetch('https://backcaliria.vercel.app/rtsol',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            "sol": {
                "table_id": table_id,
                "comb_id": selectedComb,
                "active": active,
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
        toast.success(`Nueva Combinacion - ${selectedComb}: ${d1}${d2}${d3}${d4}${d5}`)

        setSelected(false)
        get_RT_sol()
      } catch {
        toast.error(`Algo salio mal...`)

        setSelected(false)
        get_RT_sol()
      }
        
    }

    const selectComb = (combName: string) => {
      setSelected(true)
      setSelectedComb(combName)
      const newComb: comb | undefined = combList.get(combName)
      setActualComb(newComb)
      
      setD1(newComb?.d1)
      setD2(newComb?.d2)
      setD3(newComb?.d3)
      setD4(newComb?.d4)
      setD5(newComb?.d5)
      setClave(newComb?.code)
      setMessage(newComb?.msg)
      setActive(newComb?.active)
    }

    const switchStyle = {
      borderRadius: 2,
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "green"
      },
      "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
        backgroundColor: 'lightgreen'
      }
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
        width: '525px',
        borderRadius: '10px 10px 0 0'
      }}>Royal Tablet</h1>

      <div style={{
        border: 'solid 2px #181818',
        borderBottom: 'solid 1px #181818',
        height: '240px',
        width: '521px',
        borderBottomLeftRadius: (selected ? "none" : "0 0 10px 10px"),
        borderBottomRightRadius: (selected ? "none" : "0 0 10px 10px")
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '20px',
          width: '80%'
        }}>
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            height: '20px',
            padding: 'none',
            margin: '20px 10px'
          }}>Combinacion: </p>
          <select style={{
            width: '100%',
            height: '30px',
            marginTop: '10px',
            padding: 'none',
            color: 'white',
            backgroundColor: '#3d3d3d',
            borderRadius: '3px'
          }}
          value={selectedComb}
          onChange={(e: any) => selectComb(e.target.value)}
          >
            <option value={""} disabled>Selecciona una Combinación</option>
            {
              combOptions.map((comb, key) => {
                return (
                  <option key={key} value={comb}>{comb}</option>
                )
              })
            }
          </select>
          
        </div>
        
        {!selected ? (
          <>
            <h1 style={{
              fontSize: '25px',
              marginTop: '70px'
            }}>Seleccione una Combinación</h1>
          </>
          ) : (
          <>
        <p style={{
          margin: 'none',
          padding: 'none',
          fontSize: 20,
          fontWeight: 'bold'
        }}>Combinación Actual: {actualComb?.d1}{actualComb?.d2}{actualComb?.d3}{actualComb?.d4}{actualComb?.d5}</p>

        <h3 style={{
          fontSize: 20
        }}>
          Mensaje: {actualComb?.msg}
        </h3>
        <h3 style={{
          fontSize: 20
        }}>
          Clave: {actualComb?.code}
        </h3>
        </>
        )}
      </div>

        {!selected ? (<></>) : (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: 'solid 2px #181818',
        borderTop: 'solid 1px #181818',
        borderRadius: '0 0 10px 10px',
        paddingBottom: '20px',
        width: '521px'
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '150px',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: '10px',
            backgroundColor: '#343434',
            borderRadius: '20px'
          }}>
            <p style={{
              paddingTop: 'none',
              marginBottom: '0px',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {active ? "Activada" : "Desactivada"}
            </p>
            <Switch checked={active} onChange={(event: any) => {
                setActive(event.target.checked)
              }} color="warning" sx={switchStyle} />
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
              padding: 'none',
              backgroundColor: '#3d3d3d',
              color: 'rgba(255, 255, 255, 0.87)',
              borderRadius: '3px'
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
              padding: 'none',
              backgroundColor: '#3d3d3d',
              color: 'rgba(255, 255, 255, 0.87)',
              borderRadius: '3px'
            }} type="text" value={clave} onChange={(event) => setClave(event.target.value)} />
          </div>
          
          
          <button style={{
            margin: 'auto',
            marginTop: '30px',
            color: 'rgba(255, 255, 255, 0.87)'
          }} onClick={() => post_RT_sol(active, d1, d2, d3, d4, d5, clave, message)}>
            APLICAR
          </button>
        </div>
        
      </div>
      )}
      
      <Toaster 
        toastOptions={{
          duration: 5000,
          style: {
            background: '#006400',
            color: '#fff'
          }
        }}
      />
    </>
    )
}
export default Royal_tablet;
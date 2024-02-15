const Rt_pestillo = ({ num, setter }: { num: number, setter: Function })  => {

    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            width: '150px',
            height: '50px'
          }}>
        <h4
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: '40px',
            margin: 'none',
            width: '40px',
            height: '40px'
        }}
          onClick={() => { num == 0 ? setter(9) : setter(num - 1)}}
        >
          -
        </h4>
        <h4 style={{
            userSelect: 'none',
            fontSize: '40px',
            margin: 'none',
            padding: 'none',
            width: '40px',
            height: '40px'
        }}>
          {num}
        </h4>
        <h4 
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: '40px',
            margin: 'none',
            width: '40px',
            height: '40px'
        }}
          onClick={() => { num == 9 ? setter(0) : setter(num + 1)}}
        >
          +
        </h4>
      </div>
    )
}

export default Rt_pestillo;
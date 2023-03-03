import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function Test() {
  const [reactJson, setReactJson] = useState(null)
  const [reqConfig, setReqConfig] = useState<any>(null)
  const testAxios = () => {
    axios.get('http://localhost:3000/api/reactJson').then((res) => {
      if (res.data && !reactJson) {
        setReactJson(res.data)
      }
      setReqConfig(res.config)
    })
  }

  useEffect(() => {
    // console.log('清除副作用', reactJson, reqConfig)
  }, [reactJson])
  // console.log('我执行了渲染')
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div onClick={testAxios}>
      <button>Hello World</button>
    </div>
  )
}

export default Test

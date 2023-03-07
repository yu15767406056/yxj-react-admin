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
    <div onClick={testAxios}>
      <button>Hello World</button>
    </div>
  )
}

export default Test

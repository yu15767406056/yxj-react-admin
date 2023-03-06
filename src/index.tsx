import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './views/App'
import reportWebVitals from './reportWebVitals'
import { AliveScope } from 'react-activation'

console.log('我看看是啥环境', process.env.REACT_APP_SECRET_CODE)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  //严格模式下渲染函数会执行两次,去掉
  // <React.StrictMode>
  <AliveScope>
    <App />
  </AliveScope>,
  // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

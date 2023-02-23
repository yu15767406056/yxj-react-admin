import './App.css'
// import Layout from "../layout";
// import BaseLayout from "../layout";
import { BrowserRouter } from 'react-router-dom'
import AuthRouter from '@/router/utils/authRouter'
import RouterComponent from '@/router'

const App = () => {
  return (
    <BrowserRouter>
      <AuthRouter>
        <RouterComponent></RouterComponent>
      </AuthRouter>
    </BrowserRouter>
  )
}

export default App

import './App.css'
// import Layout from "../layout";
// import BaseLayout from "../layout";
import { BrowserRouter } from 'react-router-dom'
import AuthRouter from '@/router/utils/authRouter'
import RouterComponent from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthRouter>
          <RouterComponent></RouterComponent>
        </AuthRouter>
      </BrowserRouter>
    </Provider>
  )
}

export default App

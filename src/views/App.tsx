import './App.css'
import { BrowserRouter } from 'react-router-dom'
import authRouter from '@/router/utils/authRouter'
import RouterComponent from '@/router'
import { Provider } from 'react-redux'
import { store } from '@/redux'

const App = () => {
  const AuthRouter = authRouter(RouterComponent)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthRouter></AuthRouter>
      </BrowserRouter>
    </Provider>
  )
}

export default App

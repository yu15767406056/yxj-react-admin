import './App.css'
import { BrowserRouter } from 'react-router-dom'
import authRouter from '@/router/utils/authRouter'
import RouterComponent from '@/router'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  const AuthRouter = authRouter(RouterComponent)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <AuthRouter></AuthRouter>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

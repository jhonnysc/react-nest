import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import GlobalStyle from '@/assets/styles/global'

import 'react-toastify/dist/ReactToastify.css'

import Routes from './routes'
import history from './services/history'
import store from './store'

const App: React.FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <ToastContainer position="bottom-left" autoClose={3000} />
        <Routes history={history} />
        <GlobalStyle />
      </Provider>
    </StrictMode>
  )
}

export default App

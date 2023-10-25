import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { BrowserRouter as Router } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { CartContextProvider } from './utils/CartContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <Provider store={store}>
        <CartContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </CartContextProvider>
      </Provider>
    </Router>
  </>
)

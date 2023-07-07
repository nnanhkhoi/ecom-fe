import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import { createGlobalStyle } from 'styled-components'
import { CartContextProvider } from './utils/CartContext'
import { AuthProvider } from 'utils/useAuth'

import App from './App'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
  hr{
    display: block;
    border:0;
    border-top:1px solid #ccc;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyles />
    <Router>
      <AuthProvider>
        <CartContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CartContextProvider>
      </AuthProvider>
    </Router>
  </>
)

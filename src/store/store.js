import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import cartReducer from './reducers/cartReducer'
import productReducer from './reducers/productReducer'

// Create the store with the initial state
const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    cart: cartReducer,
    product: productReducer,
  },
})

export default store

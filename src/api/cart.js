import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/cart'
axios.defaults.withCredentials = true

// Make an API request to the backend to update the cart in the database
const addToCart = async (productId) => {
  const response = await axios.post(baseUrl, {
    productId,
    quantity: 1,
  })
  return response.data
}

const decAmount = async (productId) => {
  const response = await axios.post(baseUrl, {
    productId,
    quantity: -1,
  })

  return response.data
}

const removeFromCart = async (productId) => {
  const response = await axios.delete(`${baseUrl}/${productId}`)
  return response.data
}

// Action creator for fetching cart items
const fetchCartItems = async () => {
  // Make an HTTP request to the backend API endpoint
  const response = await axios.get(baseUrl)

  return response.data
}

const checkout = async (orderInfo) => {
  // Make an HTTP request to the backend API endpoint
  const response = await axios.post(`${baseUrl}/checkout`, orderInfo)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addToCart,
  decAmount,
  removeFromCart,
  fetchCartItems,
  checkout,
}

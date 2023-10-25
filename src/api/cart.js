import axios from 'axios'
import axiosApiInstance from 'createInstance'
// const baseUrl = 'http://localhost:3003/api/cart'
const baseUrl = '/v1/api/cart'
axios.defaults.withCredentials = true

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
}

// Make an API request to the backend to update the cart in the database
const addToCart = async (userId, productId) => {
  const response = await axiosApiInstance.post(
    baseUrl,
    {
      userId,
      productId,
      quantity: 1,
    },
    {
      headers: { 'x-client-id': userId },
    }
  )
  return response.data
}

const decAmount = async (userId, productId) => {
  const response = await axiosApiInstance.post(
    baseUrl,
    {
      productId,
      quantity: -1,
    },
    {
      headers: { 'x-client-id': userId },
    }
  )

  return response.data
}

const removeFromCart = async (userId, productId) => {
  const response = await axiosApiInstance.delete(`${baseUrl}/${productId}`, {
    headers: { 'x-client-id': userId },
  })
  return response.data
}

// Action creator for fetching cart items
const fetchCartItems = async (userId) => {
  // Make an HTTP request to the backend API endpoint
  const response = await axiosApiInstance.get(baseUrl, {
    headers: { 'x-client-id': userId },
  })

  return response.data
}

const checkout = async (userId, orderInfo) => {
  // Make an HTTP request to the backend API endpoint
  const response = await axiosApiInstance.post(`/v1/api/checkout`, orderInfo, {
    headers: { 'x-client-id': userId },
  })
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

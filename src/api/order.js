import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/order'
axios.defaults.withCredentials = true

const getOrder = async (token) => {
  // Make an HTTP request to the backend API endpoint
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

export default {
  getOrder,
}

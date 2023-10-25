import axios from 'axios'
import axiosApiInstance from 'createInstance'
// const baseUrl = 'http://localhost:3003/api/order'
const baseUrl = '/v1/api/order'
axios.defaults.withCredentials = true

const getOrder = async (userId) => {
  // Make an HTTP request to the backend API endpoint
  const response = await axiosApiInstance.get(baseUrl, {
    headers: { 'x-client-id': userId },
  })
  return response.data
}
// eslint-disable-next-line
export default {
  getOrder,
}

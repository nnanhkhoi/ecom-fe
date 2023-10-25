import axios from 'axios'
import axiosApiInstance from 'createInstance'

// const baseUrl = 'http://localhost:3003/api'
const baseUrl = '/v1/api/shop'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`)
  return response.data
}

const logout = async (userId) => {
  const response = await axiosApiInstance.post(`${baseUrl}/logout`, '', {
    withCredentials: true,
    headers: { 'x-client-id': userId },
  })
  return response.data
}

const getSession = async () => {
  const response = await axios.get(`${baseUrl}/session`, {
    withCredentials: true,
  })
  return response.data
}

// eslint-disable-next-line
export default { login, logout, getSession }

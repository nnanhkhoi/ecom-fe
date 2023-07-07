import axios from 'axios'
const baseUrl = 'http://localhost:3003/api'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials, {
    withCredentials: true,
  })
  return response.data
}

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`, '', {
    withCredentials: true,
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

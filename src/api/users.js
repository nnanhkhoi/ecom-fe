import axios from 'axios'
// const baseUrl = 'http://localhost:3003/api/users'
const baseUrl = '/v1/api/users'
axios.defaults.withCredentials = true

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default getAllUsers

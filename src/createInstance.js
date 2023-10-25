import axios from 'axios'
const axiosApiInstance = axios.create()

const refreshToken = async () => {
  try {
    const res = await axios.post('/v1/api/shop/handleRefreshToken', {
      withCredentials: true,
    })
    return res.data.metadata
  } catch (err) {
    console.log(err)
  }
}

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const access_token = await refreshToken()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      return axiosApiInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default axiosApiInstance

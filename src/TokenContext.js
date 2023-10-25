import { createContext, useState, useEffect, useContext } from 'react'
import orderApi from 'api/order'

export const TokenContext = createContext('')

// Create a provider component
export function TokenContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get session data from session storage on component mount
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const userToken = storedUser
      setUser(JSON.parse(userToken))
      orderApi.setToken(userToken.token)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <p>Loading...</p> // Render a loading state until user data is available
  }

  return (
    <TokenContext.Provider value={{ user, setUser }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useUserToken() {
  return useContext(TokenContext)
}

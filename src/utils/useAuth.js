import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import sessionsApi from 'api/login'

const AuthContext = createContext('')

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    sessionsApi
      .getSession()
      .then((user) => {
        setSession(true)
        setUser(user)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (error) setError(null)
  }, [location.pathname])

  async function login({ email, password }) {
    setLoading(true)

    sessionsApi
      .login({ email, password })
      .then((user) => {
        setSession(true)
        setUser(user)
        navigate('/')
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  async function signUp(email, name, password) {
    setLoading(true)
  }

  async function logout() {
    sessionsApi.logout().then(() => {
      setSession(false)
      setUser(null)
    })
  }

  const memoedValue = useMemo(
    () => ({
      session,
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [session, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}

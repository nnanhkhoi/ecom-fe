import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'utils/useAuth'

export const ProtectedRoute = () => {
  const { session, loading } = useAuth()

  return loading ? (
    <p>Loading...</p>
  ) : session ? (
    <Outlet />
  ) : (
    <Navigate replace to={'/login'} />
  )
}

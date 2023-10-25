import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.login.currentUser)

  return user ? <Outlet /> : <Navigate replace to={'/login'} />
}

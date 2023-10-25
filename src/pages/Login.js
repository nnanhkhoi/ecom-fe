import { Navigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

import AuthLogin from '../components/Login/LoginComponent'

// ================================|| LOGIN ||================================ //

const Login = () => {
  const user = useSelector((state) => state.auth.login.currentUser)

  if (user) {
    return <Navigate to="/" replace />
  }
  return (
    <Grid item xs={12}>
      <AuthLogin />
    </Grid>
  )
}

export default Login

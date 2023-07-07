import { Navigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import useAuth from 'utils/useAuth'

import AuthLogin from '../components/Authentication/auth-forms/AuthLogin'

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { session } = useAuth()

  if (session) {
    return <Navigate to="/" replace />
  }
  return (
    <Grid item xs={12}>
      <AuthLogin />
    </Grid>
  )
}

export default Login

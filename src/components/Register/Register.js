import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Link,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { registerUser } from 'redux/apiRequest' // Adjust this import based on your actual API call for registration

const theme = createTheme()

export default function AuthSignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSignUp = async (values) => {
    const { email, password, username } = values
    // Implement your sign-up logic here, potentially using registerUser or similar
    console.log('Sign Up:', username, email, password)

    registerUser(
      {
        email,
        password,
        name: username,
      },
      dispatch,
      navigate
    )
    // Navigate or show success message upon successful sign-up
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignUp)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('username', { required: 'Username is required' })}
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              error={Boolean(errors.username)}
              helperText={errors.username && errors.username.message}
            />
            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              margin="normal"
              fullWidth
              label="Email Address"
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should have at least 6 characters',
                },
              })}
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register('confirmPassword', {
                validate: (value) =>
                  value === watch('password') || 'The passwords do not match',
              })}
              margin="normal"
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to the terms and conditions."
              {...register('terms', {
                required: 'You must agree to the terms.',
              })}
            />
            {errors.terms && (
              <p style={{ color: 'red' }}>{errors.terms.message}</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

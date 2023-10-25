import axios from 'axios'
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice'
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from './userSlice'

import axiosApiInstance from 'createInstance'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('/v1/api/shop/login', user)
    dispatch(loginSuccess(res.data.message.metadata.shop))
    navigate('/')
  } catch (err) {
    dispatch(loginFailed())
  }
}

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart())

  try {
    await axios.post('/v1/api/shop/signup', user)
    dispatch(registerSuccess())
    navigate('/login')
  } catch (error) {
    dispatch(registerFailed())
  }
}

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUserStart())
  try {
    const res = await axiosApiInstance.get('v1/user', {
      headers: { token: `Bearer ${accessToken}` },
    })
    dispatch(getUserSuccess(res.data))
  } catch (error) {
    dispatch(getUserFailed())
  }
}

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart())
  try {
    const res = await axiosApiInstance.delete('/v1/user/' + id, {
      headers: { token: `Bearer ${accessToken}` },
    })
    dispatch(deleteUserSuccess(res.data))
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data))
  }
}

export const logout = async (dispatch, userId, navigate) => {
  dispatch(logoutStart())
  try {
    await axiosApiInstance.post('/v1/api/shop/logout', userId, {
      withCredentials: true,
      headers: { 'x-client-id': userId },
    })

    dispatch(logoutSuccess())
    navigate('/')
  } catch (error) {
    dispatch(logoutFailed())
  }
}

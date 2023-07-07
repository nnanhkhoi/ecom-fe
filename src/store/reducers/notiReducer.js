let timer

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return (state = action.data.notification)
    default:
      return state
  }
}

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTI',
      data: { notification },
    })
    clearTimeout(timer)
    timer = setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTI',
          data: { notification: '' },
        }),
      timeout * 1000
    )
  }
}

export const setError = (notification, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ERR',
      data: { notification },
    })
    clearTimeout(timer)
    timer = setTimeout(
      () =>
        dispatch({
          type: 'SET_ERR',
          data: { notification: '' },
        }),
      timeout * 1000
    )
  }
}

export default reducer

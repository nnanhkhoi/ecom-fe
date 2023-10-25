const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.user
    default:
      return state
  }
}

export const storeUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: { user },
    })
  }
}

export default userReducer

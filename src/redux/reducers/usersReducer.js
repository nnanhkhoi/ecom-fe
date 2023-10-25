import usersService from '../../api/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.payload
    default:
      return state
  }
}

export const initialization = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      payload: users,
    })
  }
}

export default usersReducer

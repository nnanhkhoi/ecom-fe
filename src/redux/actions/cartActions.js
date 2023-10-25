import cartApi from '../../api/cart'

export const addToCart = (productId) => {
  return async (dispatch) => {
    try {
      cartApi.addProduct(productId)
      // Dispatch the action to update the cart in the Redux store
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId },
      })
    } catch (error) {
      // Handle error if the request fails
      console.error('Error adding to cart:', error)
    }
  }
}

// increment and decrement the product

export const setDecrease = (productId) => {
  return async (dispatch) => {
    try {
      cartApi.decAmount(productId)
      // Dispatch the action to update the cart in the Redux store
      dispatch({
        type: 'SET_DECREMENT',
        payload: { productId },
      })
    } catch (error) {
      // Handle error if the request fails
      console.error('Error adding to cart:', error)
    }
  }
}

// to remove the individual item from cart
export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      cartApi.removeProduct(productId)
      // Dispatch the action to update the cart in the Redux store
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { productId },
      })
    } catch (error) {
      // Handle error if the request fails
      console.error('Error adding to cart:', error)
    }
  }
}
// to clear the cart
export const clearCart = () => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_CART' })
  }
}

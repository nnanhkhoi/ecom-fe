const getLocalCartData = () => {
  let localCartData = localStorage.getItem('cart')
  if (localCartData === []) {
    return []
  } else {
    return JSON.parse(localCartData)
  }
}

const initialState = {
  cart: getLocalCartData(),
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let { product } = action.payload

      // tackle the existing product

      // let existingProduct = state.cart.find(
      //   (curItem) => curItem.id === id + color
      // )

      // if (existingProduct) {
      //   let updatedProduct = state.cart.map((curElem) => {
      //     if (curElem.id === id + color) {
      //       let newAmount = curElem.amount + amount

      //       if (newAmount >= curElem.max) {
      //         newAmount = curElem.max
      //       }
      //       return {
      //         ...curElem,
      //         amount: newAmount,
      //       }
      //     } else {
      //       return curElem
      //     }
      //   })
      //   return {
      //     ...state,
      //     cart: updatedProduct,
      //   }
      // } else {
      // let cartProduct = {
      //   name: product.name,
      // }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
      // }
    }

    // to set the increment and decrement
    case 'SET_DECREMENT': {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1

          if (decAmount <= 1) {
            decAmount = 1
          }

          return {
            ...curElem,
            amount: decAmount,
          }
        } else {
          return curElem
        }
      })
      return { ...state, cart: updatedProduct }
    }

    case 'SET_INCREMENT': {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1

          if (incAmount >= curElem.max) {
            incAmount = curElem.max
          }

          return {
            ...curElem,
            amount: incAmount,
          }
        } else {
          return curElem
        }
      })
      return { ...state, cart: updatedProduct }
    }

    case 'REMOVE_ITEM': {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      )
      return {
        ...state,
        cart: updatedCart,
      }
    }

    // to empty or to clear to cart
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: [],
      }
    }

    case 'CART_ITEM_PRICE_TOTAL': {
      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem

          accum.total_item += amount
          accum.total_price += price * amount

          return accum
        },
        {
          total_item: 0,
          total_price: 0,
        }
      )
      return {
        ...state,
        total_item,
        total_price,
      }
    }

    default:
      return state
  }
}

export default cartReducer

// https://stackoverflow.com/questions/63117470/how-to-return-two-values-in-reduce#:~:text=You%20cannot%20return%20two%20values%20in%20reduce%20.

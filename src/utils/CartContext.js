import { createContext, useEffect, useState } from 'react'
import cartApi from 'api/cart'
import { useSelector } from 'react-redux'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const user = useSelector((state) => state.auth.login.currentUser)

  const ls = typeof window !== 'undefined' ? window.localStorage : null

  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  useEffect(() => {
    async function fetchCartItems() {
      if (user) {
        const items = await cartApi.fetchCartItems(user.id)
        setCartProducts(items.metadata)
      }
    }

    fetchCartItems()
    setLoading(false)
  }, [])

  async function addProduct(productId) {
    try {
      const data = await cartApi.addToCart(user.id, productId)
      // setCartProducts((prev) => [...prev, productId])
    } catch (error) {
      console.error('Error adding product to cart:', error)
    }
  }

  async function removeProduct(productId) {
    try {
      await cartApi.decAmount(user.id, productId)
      // setCartProducts((prev) => {
      //   const pos = prev.indexOf(productId)
      //   if (pos !== -1) {
      //     return prev.filter((value, index) => index !== pos)
      //   }
      //   return prev
      // })
    } catch (error) {
      console.error('Error removing product from cart:', error)
    }
  }

  async function clearCart() {
    try {
      // await clearCart()
      setCartProducts([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }
  if (loading) {
    return <p>Loading...</p> // Render a loading state until user data is available
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

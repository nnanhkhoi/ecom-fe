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
      await cartApi.addToCart(user.id, productId)
      setCartProducts((prev) => {
        // Check if the product already exists in the cart
        const productExists = prev.some((item) => item.productId === productId)

        if (!productExists) {
          // If it doesn't exist, add it to the cart
          return [...prev, { productId, quantity: 1 }] // Assuming you also need to track quantity
        }

        // If it exists, just return the previous state
        return prev
      })
    } catch (error) {
      console.error('Error adding product to cart:', error)
    }
  }

  async function decreaseProduct(productId) {
    try {
      await cartApi.decAmount(user.id, productId)
      setCartProducts((prev) => {
        const existingProduct = prev.find(
          (item) => item.productId === productId
        )

        if (existingProduct && existingProduct.quantity > 1) {
          // Decrease quantity if more than 1
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        } else {
          // Remove product from cart if quantity is 1 or less
          return prev.filter((item) => item.productId !== productId)
        }
      })
    } catch (error) {
      console.error('Error removing product from cart:', error)
    }
  }

  async function removeFromCart(productId) {
    try {
      await cartApi.removeFromCart(user.id, productId)
      setCartProducts((prev) => {
        // Remove product from cart regardless of its quantity
        return prev.filter((item) => item.productId !== productId)
      })
    } catch (error) {
      console.error('Cannot remove product from cart')
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
        decreaseProduct,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

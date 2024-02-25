import styled from 'styled-components'
import Center from '../../Center'
import Button from '../../Button'
import Table from '../../Table'
import { useNavigate } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../utils/CartContext'
import cartApi from '../../../api/cart'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { useSelector } from 'react-redux'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 0.5fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(5),
  table tbody tr.subtotal td:nth-child(4) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }

  tr.total td {
    font-weight: bold;
  }
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button {
    padding: 0 !important;
  }
`

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`

export default function CartPage() {
  const { cartProducts, addProduct, decreaseProduct, removeFromCart } =
    useContext(CartContext)
  const user = useSelector((state) => state.auth.login.currentUser)

  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cartApi.fetchCartItems(user.id).then((response) => {
      setProducts(response.metadata)
      setLoading(false)
    })
  }, [])

  function moreOfThisProduct(id) {
    addProduct(id)
    // Update products state immediately
    const updatedProducts = products.map((product) => {
      if (product.productId === id) {
        return { ...product, quantity: product.quantity + 1 }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  function lessOfThisProduct(id) {
    decreaseProduct(id)
    // Update products state immediately
    const updatedProducts = products.map((product) => {
      if (product.productId === id) {
        return { ...product, quantity: Math.max(0, product.quantity - 1) }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  const deleteFromCart = (id) => {
    removeFromCart(id)

    // Filter out the deleted product instead of setting its quantity to 0
    const updatedProducts = products.filter(
      (product) => product.productId !== id
    )
    setProducts(updatedProducts)
  }

  let productsTotal = 0

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price)
      const quantity = item.quantity
      return total + price * quantity
    }, 0)
  }
  productsTotal = calculateTotalPrice(products)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <Header /> */}
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!products?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.name}
                      </ProductInfoCell>
                      <td>{product.price}</td>
                      <td>
                        <Button
                          $white="true"
                          onClick={() => lessOfThisProduct(product.productId)}
                        >
                          -
                        </Button>
                        <QuantityLabel>{product.quantity}</QuantityLabel>
                        <Button
                          $white="true"
                          onClick={() => moreOfThisProduct(product.productId)}
                        >
                          +
                        </Button>
                      </td>
                      <td>${product.quantity * product.price}</td>
                      <td>
                        <Button
                          $white="true"
                          onClick={() => deleteFromCart(product.productId)}
                        >
                          <HighlightOffOutlinedIcon sx={{ color: '#ff5722' }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {!!products?.length && (
            <Box>
              <h2>Cart Summary</h2>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="subtotal">
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal}</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Shipping</td>
                    {/* <td>${shippingFee}</td> */}
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Total</td>
                    {/* <td>${productsTotal + parseInt(shippingFee || 0)}</td> */}
                  </tr>
                </tbody>
              </Table>
              <Button
                $black="true"
                $block="true"
                onClick={() => navigate('/checkout')}
              >
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}

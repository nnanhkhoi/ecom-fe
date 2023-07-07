import Center from '../components/Center'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../utils/CartContext'

import cartApi from '../api/cart'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
  margin: 40px 0;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Label = styled.label`
  position: absolute;
  top: ${({ focused }) => (focused ? '-12px' : '50%')};
  left: 10px;
  transform: ${({ focused }) =>
    focused ? 'translateY(0)' : 'translateY(-50%)'};
  background-color: #fff;
  padding: 0 4px;
  font-size: 12px;
  color: ${({ focused }) => (focused ? '#007bff' : '#777')};
  transition: top 0.3s, transform 0.3s, color 0.3s;
`

const Input = styled.input`
  border: 1px solid ${({ isinvalid }) => (isinvalid ? 'red' : '#ccc')};
  padding: 8px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`

const Select = styled.select`
  border: 1px solid ${({ isinvalid }) => (isinvalid ? 'red' : '#ccc')};
  padding: 8px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`

const CheckoutPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext)

  //   const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')

  const [products, setProducts] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      clearCart()
    }
  }, [])

  const goToPayment = async (e) => {
    e.preventDefault()

    const response = await cartApi.checkout({
      name,
      email,
      city,
      postalCode,
      streetAddress,
      payment_id: 1,
    })
    console.log(response)
    if (response.url) {
      window.location = response.url
    }
  }

  if (isSuccess) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }

  return (
    <>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Shipping</h1>
            <p>Please enter your shipping details.</p>
            <Box>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button onClick={goToPayment}>Continue to payment</Button>
            </Box>
          </Box>
          <Table>
            <thead>
              <tr>
                <th></th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>product</td>
                <td>price</td>
              </tr>
            </tbody>
          </Table>
        </ColumnsWrapper>
      </Center>
    </>
  )
}

export default CheckoutPage

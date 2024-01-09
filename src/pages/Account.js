// import Title from '../components/Title'
import Center from '../components/Center'
import Button from '../components/Button'
import styled from 'styled-components'
import WhiteBox from '../components/WhiteBox'
import Input from '../components/Input'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
// import Spinner from '../components/Spinner'
import ProductBox from '../components/Product/ProductBox'
import Tabs from '../components/Tabs'
import SingleOrder from '../components/SingleOrder'

import orderAPI from '../api/order'
import { TokenContext } from '../TokenContext'
import { useSelector } from 'react-redux'

const ColsWrapper = styled.div`
  display: grid;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default function AccountPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')
  const [addressLoaded, setAddressLoaded] = useState(true)
  const [wishlistLoaded, setWishlistLoaded] = useState(true)
  const [orderLoaded, setOrderLoaded] = useState(false)
  const [wishedProducts, setWishedProducts] = useState([])
  const [activeTab, setActiveTab] = useState('Orders')
  const [orders, setOrders] = useState([])

  const user = useSelector((state) => state.auth.login.currentUser)

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country }
    axios.put('/api/address', data)
  }

  useEffect(() => {
    setAddressLoaded(false)
    setWishlistLoaded(false)
    setOrderLoaded(false)

    const fetchData = async () => {
      try {
        const orderResponse = await orderAPI.getOrder(user.id)
        setOrders(orderResponse.metadata)
        setOrderLoaded(true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)]
    })
  }

  return (
    <>
      <Center>
        <ColsWrapper>
          <div>
            <WhiteBox>
              <Tabs
                tabs={['Orders', 'Wishlist']}
                active={activeTab}
                onChange={setActiveTab}
              />
              {activeTab === 'Orders' && (
                <>
                  {!orderLoaded && <p>Loading</p>}
                  <ItemsContainer>
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && <p>Order empty</p>}
                        {orders.length > 0 &&
                          orders.map((o, index) => (
                            <SingleOrder {...o} key={index} />
                          ))}
                      </div>
                    )}
                  </ItemsContainer>
                </>
              )}
              {activeTab === 'Wishlist' && (
                <>
                  {wishlistLoaded && (
                    <>
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 &&
                          wishedProducts.map((wp) => (
                            <ProductBox
                              key={wp._id}
                              {...wp}
                              wished={true}
                              onRemoveFromWishlist={productRemovedFromWishlist}
                            />
                          ))}
                      </WishedProductsGrid>
                      {wishedProducts.length === 0 && (
                        <>
                          {/* {session && <p>Your wishlist is empty</p>}
                          {!session && (
                            <p>Login to add products to your wishlist</p>
                          )} */}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </WhiteBox>
          </div>
          {/* <div>
            <WhiteBox>
              {addressLoaded && (
                <>
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
                  <Button black="true" block="true" onClick={saveAddress}>
                    Save
                  </Button>
                  <hr />
                </>
              )}
            </WhiteBox>
          </div>*/}
        </ColsWrapper>
      </Center>
    </>
  )
}

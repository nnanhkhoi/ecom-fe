import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Center from '../components/Center'

// import Header from '@/components/Header'
// import { mongooseConnect } from '@/lib/mongoose'
// import { Product } from '@/models/Product'
import styled from 'styled-components'
import ProductImages from '../components/Product/ProductImages'
import CartIcon from '../components/icons/CartIcon'
import FlyingButton from '../components/FlyingButton'
// import ProductReviews from '@/components/ProductReviews'

import { useParams } from 'react-router-dom'

const Title = styled.h1`
  font-size: 1.5em;
`

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.4fr 0.6fr;
  }
  gap: 40px;
  margin: 40px 0;
`
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Price = styled.span`
  font-size: 1.4rem;
`

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/v1/api/products/${id}`)
        setProduct(response.data.metadata)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <Header /> */}
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.name}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <FlyingButton
                  main="true"
                  _id={product.id}
                  src={product.images?.[0]}
                >
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        {/* <ProductReviews product={product} /> */}
      </Center>
    </>
  )
}

export default ProductPage

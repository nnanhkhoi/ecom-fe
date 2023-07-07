import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import Center from '../components/common/Center'
import ProductsGrid from '../components/Product/ProductsGrid'
import axios from 'axios'
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`

const AllProducts = ({ wishedProducts }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3003/api/products')
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  )
}

export default AllProducts

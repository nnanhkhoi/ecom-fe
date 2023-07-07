import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Center from 'components/Center'
import ProductBox from 'components/Product/ProductBox'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-block;
  }
`
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`

export default function CategoriesPage({ categoriesProducts }) {
  const { link } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/category/${link}`
        )
        setProducts(response.data)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
  }, [link])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Center>
        <CategoryWrapper>
          <CategoryTitle>
            <h2>{link}</h2>
          </CategoryTitle>
          <CategoryGrid>
            {products?.map((cat, index) => (
              <ProductBox {...cat} key={index} />
            ))}

            {/* <ShowAllSquare href={'/category/' + cat._id}>
                Show all &rarr;
              </ShowAllSquare> */}
          </CategoryGrid>
        </CategoryWrapper>
      </Center>
    </>
  )
}

// export async function getServerSideProps(ctx) {
//   await mongooseConnect()
//   const categories = await Category.find()
//   const mainCategories = categories.filter((c) => !c.parent)
//   const categoriesProducts = {} // catId => [products]
//   const allFetchedProductsId = []
//   for (const mainCat of mainCategories) {
//     const mainCatId = mainCat._id.toString()
//     const childCatIds = categories
//       .filter((c) => c?.parent?.toString() === mainCatId)
//       .map((c) => c._id.toString())
//     const categoriesIds = [mainCatId, ...childCatIds]
//     const products = await Product.find({ category: categoriesIds }, null, {
//       limit: 3,
//       sort: { _id: -1 },
//     })
//     allFetchedProductsId.push(...products.map((p) => p._id.toString()))
//     categoriesProducts[mainCat._id] = products
//   }

//   const session = await getServerSession(ctx.req, ctx.res, authOptions)
//   const wishedProducts = session?.user
//     ? await WishedProduct.find({
//         userEmail: session?.user.email,
//         product: allFetchedProductsId,
//       })
//     : []

//   return {
//     props: {
//       mainCategories: JSON.parse(JSON.stringify(mainCategories)),
//       categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
//       wishedProducts: wishedProducts.map((i) => i.product.toString()),
//     },
//   }
// }

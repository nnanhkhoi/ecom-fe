import styled from 'styled-components'
// import Button, {ButtonStyle} from "@/components/Button";
// import CartIcon from "@/components/icons/CartIcon";
// import Link from 'next/link'
import { Link } from 'react-router-dom'

import { useState } from 'react'
// import {CartContext} from "@/components/CartContext";
// import {primary} from "@/lib/colors";
import HeartOutlineIcon from '../icons/HeartOutlineIcon'
import HeartSolidIcon from '../icons/HeartSolidIcon'
import axios from 'axios'

const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 240px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 160px;
  }
`

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`

const ProductInfoBox = styled.div`
  margin-top: 5px;
`

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`

const Price = styled.div`
  font-size: 1rem;
  text-align: left;
`

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
    color:red;
  `
      : `
    color:black;
  `}
  svg {
    width: 16px;
  }
`

export default function ProductBox({
  id,
  name,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = '/product/' + id

  const [isWished, setIsWished] = useState(wished)

  function addToWishlist(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    const nextValue = !isWished
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(id)
    }
    axios
      .post('/api/wishlist', {
        product: id,
      })
      .then(() => {})

    setIsWished(nextValue)
  }

  return (
    <ProductWrapper>
      <WhiteBox to={url}>
        <div>
          <WishlistButton $wished={isWished.toString()} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title to={url}>{name}</Title>
        <PriceRow>
          <Price>${price}</Price>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}

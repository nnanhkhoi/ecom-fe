import styled from 'styled-components'
import { ButtonStyle } from './Button'

import { CartContext } from '../utils/CartContext'
import React, { useContext, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../../store/actions/cartActions'

const primary = '#0D3D29'
const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    ${(props) =>
      props.main
        ? `
      background-color: ${primary};
      color:white;
    `
        : `
      background-color: transparent;
      border: 1px solid ${primary};
      color:${primary};
    `}
    ${(props) =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;
      font-weight:500;
    `}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 65%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext)

  const imgRef = useRef()
  function sendImageToCart(ev) {
    imgRef.current.style.display = 'inline-block'
    imgRef.current.style.left = ev.clientX - 50 + 'px'
    imgRef.current.style.top = ev.clientY - 50 + 'px'
  }
  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}
      >
        <img src={props.src} alt="" ref={imgRef} />
        <button {...props} />
      </FlyingButtonWrapper>
    </>
  )
}

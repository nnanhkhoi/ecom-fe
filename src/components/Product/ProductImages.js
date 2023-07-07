import styled from 'styled-components'
import React, { useState } from 'react'

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`
const BigImage = styled.img`
  max-width: 100%;
  height: 400px;
  max-height: 400px;
`
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`
const BigImageWrapper = styled.div`
  text-align: center;
`

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0])
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={(image === activeImage).toString()}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  )
}

export default ProductImages

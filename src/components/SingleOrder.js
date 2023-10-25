import styled from 'styled-components'

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    color: #555;
  }
`
const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`

// const ProductImageBox = styled.div`
//   width: 70px;
//   height: 100px;
//   padding: 2px;
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   img {
//     max-width: 60px;
//     max-height: 60px;
//   }
//   @media screen and (min-width: 768px) {
//     padding: 10px;
//     width: 100px;
//     height: 100px;
//     img {
//       max-width: 80px;
//       max-height: 80px;
//     }
//   }
// `

function SingleOrder(props) {
  return (
    <StyledOrder>
      {/* <ProductImageBox>
        <img src={props.order_items.product.images[0].image} alt="" />
      </ProductImageBox> */}

      <div>
        {props.order_items.map((item) => (
          <ProductRow key={item.id}>
            <span>{item.quantity} x </span>
            {item.product.name}
          </ProductRow>
        ))}
      </div>
      <Address>
        {props.status}
        <br />
        {props.totalPrice}
        <br />
      </Address>
    </StyledOrder>
  )
}

export default SingleOrder

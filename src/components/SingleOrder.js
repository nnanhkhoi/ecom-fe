import styled from 'styled-components'

const StyledOrder = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto; // Image, Quantity/Description, Status, Price
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
`

const OrderWrapper = styled.div`
  margin: 20px 0 20px;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  // display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  background-color: #e8e8e8;
`

const ProductImageBox = styled.div`
  width: 50px; // Set width according to your design
  height: 50px; // Set width according to your design
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 4px;
  }
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ProductName = styled.span`
  font-size: 0.8rem;
  // font-weight: bold;
  color: #333;
`

const Quantity = styled.span`
  font-size: 0.85rem;
  color: #666;
`

const Status = styled.div`
  font-size: 0.9rem;
  // color: #4caf50; // Green for completed orders
  // font-weight: bold;
  text-align: right;
`

const Price = styled.div`
  font-size: 1.1rem;
  color: #ff5722; // Orange color for price
  // font-weight: bold;
  text-align: right;
`

function SingleItem({ order }) {
  return (
    <StyledOrder>
      <ProductImageBox>
        <img src={order.product.images[0].image} alt={order.product.name} />
      </ProductImageBox>

      <ProductDetails>
        <ProductName>{order.product.name}</ProductName>

        <Quantity>x{order.quantity}</Quantity>
      </ProductDetails>
    </StyledOrder>
  )
}

function SingleOrder(props) {
  return (
    <OrderWrapper>
      <div>
        {props.order_items.map((item) => (
          // Wrap each SingleItem in a container div to ensure they are listed line by line
          <div key={item.id}>
            <SingleItem order={item} />
          </div>
        ))}
        <Status>Status: {props.status}</Status>
        <Price>${props.totalPrice}</Price>
      </div>
    </OrderWrapper>
  )
}

export default SingleOrder

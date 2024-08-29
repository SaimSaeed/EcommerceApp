import React ,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { Col, ListGroup, Row } from 'react-bootstrap'

function PlaceOrder() {
    const navigate = useNavigate()
    const cart = useSelector(state=>state.cart)
    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate("/shipping")
        }else if(!cart.paymentMethod){
          navigate("/payment")
        }
    }, [cart.shippingAddress,cart.paymentMethod,navigate])
    
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
        <ListGroup variant='flush'>
        <ListGroup.Item>
   <h2>Shipping</h2>
   <p><strong>Address: </strong>
    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
   </p>
</ListGroup.Item>
<ListGroup.Item>
    
</ListGroup.Item>
        </ListGroup>
     
        </Col>
        <Col md={4}>
        Column
        </Col>
    </Row>
    
    </>
  )
}

export default PlaceOrder
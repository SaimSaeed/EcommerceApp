import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from "react-bootstrap"
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../features/ProductApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../features/CartSlice'
import { useDispatch } from 'react-redux'
function SingleProduct() {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddToCart = () => {
        dispatch(addToCart({...product,qty}))
        navigate("/cart")
    }
    return (
        <>
            <Link to={"/"} className='btn btn-light my-3'>Go Back</Link>
            {isLoading ? (<Loader />) : error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>) : (<>
                <Row>
                    <Col md={5}>
                        <Image src={product.imageSrc} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3><Rating value={product.rating} text={`${product.reviewNum} reviews`} /></h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.imageAlt}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            Qty
                                            </Col>
                                            <Col>
                                            <Form.Control
                                            as="select"
                                             value={qty}
                                             onChange={(e)=>{setQty(Number(e.target.value))}}
                                            >
                                           {[...Array(product.countInStock).keys()].map((x)=>{
                                            return <option key={x+1} value={x+1}>
                                        {x+1}
                                            </option>
                                           })}
                                            </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0} onClick={handleAddToCart}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>)}


        </>
    )
}

export default SingleProduct
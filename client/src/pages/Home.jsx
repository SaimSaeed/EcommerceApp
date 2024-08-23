import React from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
import { useGetProductsQuery } from '../features/ProductApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
function Home() {

 const {data:products,isLoading,error} = useGetProductsQuery();

    
  return (
    <>
  {isLoading ? (
    <Loader/>
  ) : error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>): (<>
  <h1 className='text-center'>Latest Products</h1>
  <Row>
  {products.map(item=>{
      return <Col sm={12} md={6} lg={4} xl={3}>
       <Product  key={item._id} item={item}/>
      </Col>
  })}
      
  </Row></>
  )}

    </>
  )
}

export default Home
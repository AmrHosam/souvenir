import React, { useEffect } from 'react'
import { useDispatch, useSelector }from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProducts } from '../actions/productActions'

const ShopScreen = () => {

  const dispatch = useDispatch()

  const state = useSelector(state => state.productList)
  const { products, loading, error } = state
  const keyword = useParams().keyword

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])
      return (
        <>
          {loading ? (
            <Loader/>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} style={{display:"flex"}}>
                <Product product={product}></Product>
              </Col>
              ))}
          </Row>
          )}
      </>
    )
}

export default ShopScreen
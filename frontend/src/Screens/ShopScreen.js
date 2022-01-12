import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../Components/Product'

const ShopScreen = () => {
    return (
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} style={{display:"flex"}}>
              <Product product={product}></Product>
            </Col>
            ))}
        </Row>
    )
}

export default ShopScreen
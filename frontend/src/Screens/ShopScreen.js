import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../Components/Product'

const ShopScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/shop')
      setProducts(data)
    }
    fetchProducts()
  }, [])
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
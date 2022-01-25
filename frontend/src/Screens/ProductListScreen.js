import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {  useNavigate } from 'react-router-dom'
 import {
   deleteProduct, getProduct, listProducts,
 } from '../actions/productActions'
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { PRODUCT_DETAILS_RESET } from '../constants/userConstants'

const ProductListScreen = () => {
  // const pageNumber = useParams() || 1
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

   const productDelete = useSelector((state) => state.productDelete)
   const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = productDelete
   
  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET })
    dispatch({ type: PRODUCT_CREATE_RESET })
    dispatch({type:PRODUCT_UPDATE_RESET})
    dispatch(listProducts())
    if (!user || !user.isAdmin) {
      navigate('/login')
    }
    
     
   }, [
     dispatch,
     user,
     navigate,
     successDelete
    ])
   const deleteHandler = (id) => {
     if (window.confirm('Are you sure')) {
       dispatch(deleteProduct(id))
     }
   }
   const edit = (id) => {
     //  dispatch(getProduct(id))
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
        <LinkContainer to='/admin/productlist/create'>
          <Button className='my-3' >
            <i className='fas fa-plus'></i> Create Product
          </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm' onClick={() => edit(product._id)}>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen

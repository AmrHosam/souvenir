import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { createProduct, getProduct, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const ProductEditScreen = () => {
  const pid = useParams().id
  
  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const productCreate = useSelector((state) => state.productCreate)
   const {
     loading: loadingCreate,
     error: errorCreate,
     success: successCreate,
   } = productCreate

   const product = useSelector((state) => state.product)
   const { loading, error, product : productDetails } = product 
   //_.isEmpty(productDetails) ?   console.log('wasal') :console.log(productDetails,pid)
   const [name, setName] = useState(_.isEmpty(productDetails) ? '' : productDetails.name)
   const [price, setPrice] = useState(_.isEmpty(productDetails)? 0 : productDetails.price)
   const [image, setImage] = useState(_.isEmpty(productDetails)?'' : productDetails.image)
   const [category, setCategory] = useState(_.isEmpty(productDetails)?'' : productDetails.category)
   const [countInStock, setCountInStock] = useState(_.isEmpty(productDetails)?0 : productDetails.countInStock)
   const [description, setDescription] = useState(_.isEmpty(productDetails)?'' : productDetails.description)
   const [uploading, setUploading] = useState(false)
  
   const navigate = useNavigate()
   const dispatch = useDispatch()
  useEffect(() => {
    console.log('wasal')
    
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    }
    else if (successCreate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navigate('/admin/productlist')
        
    } else if (pid) {
        console.log('wasal pid')
        const getp  = async() => {await dispatch(getProduct(pid))
         
        }
        getp()
        
    }
    else if (!(_.isEmpty(productDetails)))
    {
      console.log('keda')
      setName(productDetails.name)
      setCategory(productDetails.category)
      setPrice(productDetails.price)
      setCountInStock(productDetails.countInStock)
      setImage(productDetails.image)
      setDescription(productDetails.description)
}
    
  }, [dispatch, navigate,pid,getProduct,successCreate, successUpdate])
   
  

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(pid)
    if (!(_.isEmpty(pid)))
    {
      dispatch(
        updateProduct({
          _id: pid,
          name,
          price,
          image,
          category,
          description,
          countInStock,
        }))
    }
    else
    {
      dispatch(createProduct({
        name,
        price,
        image,
        category,
        description,
        countInStock,
      }))
    
    
  }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingCreate && <Loader />}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required={true}
                type='name'
                placeholder= {!(_.isEmpty(productDetails))? productDetails.name:'Enter name' }
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
              required={true}
                type='number'
                placeholder={!(_.isEmpty(productDetails))? productDetails.price.toString():'Enter price' }
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
              required={true}
                type='text'
                placeholder= {!(_.isEmpty(productDetails))? productDetails.image: 'Enter image url'}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
              required={true}
                type="file"
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
              required={true}
                type='number'
                placeholder={!(_.isEmpty(productDetails))? productDetails.countInStock.toString():'Enter countInStock'}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
              required={true}
                type='text'
                placeholder={!(_.isEmpty(productDetails))? productDetails.category:'Enter category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
              required={true}
                type='text'
                placeholder={!(_.isEmpty(productDetails))? productDetails.description:'Enter description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            {pid? 'Update':'Create'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen

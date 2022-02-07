import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import { getProduct, addProductReview } from '../actions/productActions';
import { addItem, addItemDB } from '../actions/cartActions';
import { PRODUCT_ADD_REVIEW_RESET } from '../constants/productConstants'
import Rating from '../Components/Rating';
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = () => {

    const navigate = useNavigate()
    const id = useParams().id

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const state = useSelector(state => state)
    const { loading, product, error } = state.product
    const userLogin = state.userLogin
    const { error: errorProductReview, success: successProductReview } = state.productAddReview

    const loggedIn = userLogin.user? true : false
    const userId = userLogin.user? userLogin.user._id : ''

    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
        }
        dispatch({type: PRODUCT_ADD_REVIEW_RESET})
        dispatch(getProduct(id))
    },[id, dispatch, successProductReview])

    const addToCartHandler = () => {
        if(loggedIn)
            dispatch(addItemDB(userId, id, quantity))
        else
            dispatch(addItem(id, quantity))
        navigate('/cart')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addProductReview(id, {rating, comment}))
    }
    return (
        <div>
            <Link className="btn btn-light my-3" to="/shop">Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>{product.name}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: {product.price} EGP
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>{product.price} EGP</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock': 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Quantity:
                                                </Col>
                                                <Col>
                                                    <Form.Control as='select' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={() => addToCartHandler()}
                                            >
                                                Add To Cart
                                            </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.numReviews === 0 && <Message>No reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews ? product.reviews.map((review) => (    
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                )) : '' }
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {loggedIn? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>Submit</Button>
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )   
}

export default ProductScreen

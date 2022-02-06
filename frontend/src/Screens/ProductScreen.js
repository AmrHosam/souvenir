import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import { getProduct } from '../actions/productActions';
import { addItem, addItemDB } from '../actions/cartActions';
import Rating from '../Components/Rating';
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = () => {

    const navigate = useNavigate()
    const id = useParams().id

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const state = useSelector(state => state)
    const { loading, product, error } = state.product
    const userLogin = state.userLogin

    const loggedIn = userLogin.user? true : false
    const userId = userLogin.user? userLogin.user._id : ''

    useEffect(() => {
        dispatch(getProduct(id))
    },[id, dispatch])

    const addToCartHandler = () => {
        if(loggedIn)
            dispatch(addItemDB(userId, id, quantity))
        else
            dispatch(addItem(id, quantity))
        navigate('/cart')
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/shop">Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
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
            )}
        </div>
    )   
}

export default ProductScreen

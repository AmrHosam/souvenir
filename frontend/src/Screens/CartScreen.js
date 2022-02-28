import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Form, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { addItem, addItemDB, getCartItems, initializeCart, removeItem, removeItemDB } from '../actions/cartActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader'

const CartScreen = () => {
    const Navigate = useNavigate();
    const id = useParams().id
    const location = useLocation()
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const { cart, userLogin } = useSelector(state => state)
    const { cartItems, loading, addLoading, error } = cart
    const loggedIn = userLogin.user? true : false
    const userId = userLogin.user? userLogin.user._id : ''
    useEffect(() => {
        if(loggedIn){
            if(!addLoading)
                dispatch(getCartItems())
        } else {
            dispatch(initializeCart())
        }
    }, [dispatch, id, quantity, addLoading])
    const removeFromCartHandler = (id) => {
        if(loggedIn)
            dispatch(removeItemDB(userId, id))
        else
            dispatch(removeItem(id))
    }

    const changeQuantityHandler = (itemId, quantity) => {
        if(loggedIn)
            dispatch(addItemDB(userId, itemId, quantity))
        else
            dispatch(addItem(itemId, quantity))
    }

    const checkoutHandler = () => {
        Navigate('/shipping')
        console.log('checkout')
    }
    return (
        <>
        {loading || addLoading ? (
            <Loader/>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
        <Row>
            <Col me={8}>
                <h1 style={{ fontSize: '1.8rem', padding: '1rem 0' }}>SHOPPING CART</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/shop/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price} EGP
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.quantity} onChange={(e) => changeQuantityHandler(item.product, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 style={{ fontSize: '1.4rem', padding: '0.5rem 0' }}>
                                SUBTOTAL {cartItems.reduce((acc, item) => acc + item.quantity, 0)} ITEMS
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                variant='primary'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                PROCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )}
    </>
    )
}

export default CartScreen

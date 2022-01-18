import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Form, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { addItem, removeItem } from '../actions/cartActions';
import Message from '../Components/Message';

const CartScreen = () => {
    const Navigate = useNavigate();
    const id = useParams().id
    const location = useLocation()
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)

    useEffect(() => {
        if (id)
            dispatch(addItem(id, quantity))
    }, [dispatch, id, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeItem(id))
    }

    const checkoutHandler = () => {
        Navigate('/shipping')
        console.log('checkout')
    }
    return (
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
                                        <Form.Control as='select' value={item.quantity} onChange={(e) => dispatch(addItem(item.product, Number(e.target.value)))}>
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
    )
}

export default CartScreen

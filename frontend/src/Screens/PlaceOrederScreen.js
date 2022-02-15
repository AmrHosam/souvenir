import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../Components/Message";
import CheckoutSteps from "../Components/CheckoutSteps";
import "../Components/MyForm.css";
import _ from "lodash";
import { createOrder } from "../actions/orderAction";
import { saveShippingAddress } from '../actions/cartActions';

const PlaceOrederScreen = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate();
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      Navigate(`/order/${order._id}`)
    }
  }, [success])
  cart.totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2)
  cart.shippingPrice = 50
  cart.totalCost = (Number(cart.totalPrice) + cart.shippingPrice).toFixed(2)
  const placeOrederHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.totalPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalCost,
    }))
  }

  return (
    <Row>
      <CheckoutSteps step1 step2 step3 step4 />

      <Col me={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            <ListGroup.Item key="shipping">
              <Row>
                <h2>shipping</h2>

                <strong>Address:</strong>
                <p>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},
                  {cart.shippingAddress.phone}         </p>
              </Row>
            </ListGroup.Item>

            <ListGroupItem>
              <Row>
                <h2>Payment Method</h2>
                <strong>Method:</strong>
                <p>{cart.paymentMethod}</p>
              </Row>
            </ListGroupItem>
            <h2>Order Items</h2>
            {cartItems.map(item => (

              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                  </Col>
                  <Col>
                    <Link to={`/shop/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.quantity} x {item.price} = {(item.quantity * item.price).toFixed(2)} EGP
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
              <h2>Order Summery</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>{cart.totalPrice}  EGP </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>shipping</Col>
                <Col>{cart.shippingPrice}  EGP </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col> {cart.totalCost}  EGP </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                variant='primary'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={placeOrederHandler}
              >
                place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>

  )
}

export default PlaceOrederScreen
    //         <ListGroup.item>
    //           {error && <Message variant='danger'>{error}</Message>}
    //         </ListGroup.item>
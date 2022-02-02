
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../Components/Message";
import CheckoutSteps from "../Components/CheckoutSteps";
import "../Components/MyForm.css";
import _ from "lodash";

import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [PaymentMethod, setPaymentMethod] = useState('PayPal');
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(PaymentMethod));
        Navigate('/placeorder')
    };
    // useEffect(() => {
    //     if (_.has(user, "_id")) {
    //         console.log("wasal");
    //         Navigate("/");
    //     } else Navigate("/login");
    // }, [user]);
    return (


        <Form className="m-5" onSubmit={submitHandler}>
            <CheckoutSteps step1 step2 step3 />

            <h1 className="mx-5 my-4">Payment Method </h1>
            <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
                <Form.Label as='legend'>Select Method</Form.Label>

                <Col>
                    <Form.Check type='radio' label='PayPal or CreditCard' id='PayPal'
                        name='paymentMthod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                    <Form.Check type='radio' label='cash on delivery' id='cash'
                        name='paymentMthod'
                        value='cash'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" className="sharp loginButton mx-5" variant="dark">
                continue
            </Button>
        </Form>
    )

}

export default PaymentScreen

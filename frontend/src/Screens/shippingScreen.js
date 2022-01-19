
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../Components/Message";
import CheckoutSteps from "../Components/CheckoutSteps";
import "../Components/MyForm.css";
import _ from "lodash";
import { shippingAddress } from "../actions/cartActions";
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { ShippingScreen } = cart
    const [address, setAddress] = useState(saveShippingAddress.address);
    const [city, setCity] = useState(saveShippingAddress.city);
    const [phone, setPhone] = useState(saveShippingAddress.city);
    const Navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, user, error } = userLogin;
    const dispatch = useDispatch();

    const AddresshandleChange = (e) => {
        setAddress(e.target.value);
    };
    const cityhandleChange = (e) => {
        setCity(e.target.value);
    };

    const phonehandleChange = (e) => {
        setPhone(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, phone }));
        history.push('./payment')
    };
    // useEffect(() => {
    //     if (_.has(user, "_id")) {
    //         console.log("wasal");
    //         Navigate("/");
    //     } else Navigate("/login");
    // }, [user]);
    return (


        <Form className="m-5" onSubmit={submitHandler}>
            <CheckoutSteps step1 step2 />

            <h1 className="mx-5 my-4">shipping Address</h1>
            {error && (
                <Message className="mx-5 my-4" variant="danger">
                    {error}
                </Message>
            )}
            <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
                <Form.Label>Home address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter adress"
                    value={address}
                    className="sharp loginTextArea"
                    onChange={AddresshandleChange}
                    required={true}
                />
            </Form.Group>

            <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    className="sharp loginTextArea"
                    onChange={cityhandleChange}
                    required={true}
                />
            </Form.Group>
            <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
                <Form.Label>phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="phone"
                    value={phone}
                    className="sharp loginTextArea"
                    onChange={phonehandleChange}
                    required={true}
                />
            </Form.Group>
            <Button type="submit" className="sharp loginButton mx-5" variant="dark">
                continue
            </Button>
        </Form>
    )

}

export default ShippingScreen

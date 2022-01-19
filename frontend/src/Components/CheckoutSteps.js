import React from 'react'
import { Nav, nav, Navbar } from 'react-bootstrap'
import { LinkContainer, linkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (

        <Nav classname='justify-content-center mb-4'>

            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disable>Sign In</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disable>shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disable>payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disable>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>

    )
}

export default CheckoutSteps

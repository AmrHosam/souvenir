import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MyNav.css";
import { logout } from "../actions/userActions";
import { LinkContainer  } from "react-router-bootstrap";
import {
  Fade,
  Container,
  Navbar,
  Col,
  Row,
  Nav,
  Form,
  Collapse,
  Button,
  NavDropdown
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const MyNav = () => {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState({ display: "none" });
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const clickSearch = () => {
    setOpen(!open);
    if (display.display === "none") setDisplay({ display: "inline" });
    else setDisplay({ display: "none" });
  };

  const submitLogout = (e) => {
    dispatch(logout());
    Navigate('/')
  };
  const GoLogin = () => {
    Navigate('/login')
  }

  return (
    <Navbar collapseOnSelect expand="md" className="souvenirNav">
      <Container>
        <Navbar.Toggle className="me-auto" aria-controls="souvenir-navbar" />
        <Navbar.Collapse id="souvenir-navbar">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <u>Home</u>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link href="#about">
                <u>About</u>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link href="#shop">
                <u>Shop</u>
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="#contact">
              <u>Contact Us</u>
            </Nav.Link>
          </Nav>

          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
              </Nav.Link>
            </LinkContainer>

            <Nav.Link
              className="toggleSearchIcon"
              onClick={clickSearch}
              aria-controls="searchBar"
              aria-expanded={open}
            >
              <i className="fas fa-search"></i>
            </Nav.Link>

            <Fade in={open} dimension="width" className="no">
              <Form
                className="toggleSearchIcon "
                id="searchBar"
                style={display}
              >
                <Row className="m-auto">
                  <Col xs={10}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      size="sm"
                    />
                  </Col>
                  <Col xs={2}>
                    <Button variant="outline-light" size="sm" type="submit">
                      <i
                        className="fas fa-search"
                        style={{ maxHeight: "100%" }}
                      ></i>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Fade>
            {user && user.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
                {user ? (
                  <Nav.Link onClick={submitLogout}>    <i  class="fas fa-sign-out-alt"></i> </Nav.Link>
                ) : (
                  <Nav.Link onClick={GoLogin}> <i class="fas fa-sign-in-alt"  ></i> </Nav.Link>
                )}
              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;

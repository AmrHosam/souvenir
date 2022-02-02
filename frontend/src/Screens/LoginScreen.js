import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../Components/Message";
import "../Components/MyForm.css";
import _ from "lodash";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const location = useLocation()
  console.log(location)
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, user, error } = userLogin;
  const dispatch = useDispatch();
  const EmailhandleChange = (e) => {
    setEmail(e.target.value);
  };
  const PasswordhandleChange = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  useEffect(() => {
    if (_.has(user, "_id")) {
      console.log(location)
      if (location.state?.from){
        Navigate(location.state.from)
      }
      else {
        console.log("wasal");
      Navigate("/");
      }
      
    }
     else if (typeof loading !== "undefined" && !loading){
      return <Navigate to='/login' replace state={{from : location.pathname}}/>

    }           

  }
  , [user] );

  return (
    <Form className="m-5" onSubmit={submitHandler}>
      <h1 className="mx-5 my-4">Sign In </h1>
      {error && (
        <Message className="mx-5 my-4" variant="danger">
          {error}
        </Message>
      )}
      <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          className="sharp loginTextArea"
          onChange={EmailhandleChange}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          className="sharp loginTextArea"
          onChange={PasswordhandleChange}
          required={true}
        />
      </Form.Group>
      <Button type="submit" className="sharp loginButton mx-5" variant="dark">
        Sign In
      </Button>
      <Form.Text className="text-muted d-block mt-2 mx-5">
        New Customer? <Link to="/register">Register</Link>
      </Form.Text>
    </Form>
  );
};

export default Login;

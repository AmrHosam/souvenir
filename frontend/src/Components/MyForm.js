import React, {  useState } from "react";
import { Container,  Form, Button } from "react-bootstrap";
import _ from "lodash";
import Message from "../Components/Message";
import "../Components/MyForm.css";

const MyForm = ({Title,user,Name , Submit }) => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError] = useState('')
    
  const NamehandleChange = (e) => {
    setName(e.target.value);
  };
  const EmailhandleChange = (e) => {
    setEmail(e.target.value);
  };
  const PasswordhandleChange = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordhandleChange = (e) => {
    setConfirmPassword(e.target.value);
  };
    
   const SubmitUpdate = (e) => {
     e.preventDefault()
    Submit(name,email,password,confirmPassword,setError)
   } 
    
    
    
    return (
        <Container>
        <Form className="my-3" onSubmit={SubmitUpdate}>
            <h3 className="my-3">{Title}</h3>
             {/* {loading && <Loading className='mx-5 my-4' />} */}
       {error && <Message className='mx-5 my-4' variant='danger'>{error}</Message>}  
            <Form.Group className="my-3" controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required='true'
                type="text"
                placeholder={user ? user.name : 'Name'} 
                value={name}
                className="sharp loginTextArea"
                onChange={NamehandleChange}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required='true'
                type="email"
                placeholder={user ? user.email : 'a@example.com'}
                value={email}
                className="sharp loginTextArea"
                onChange={EmailhandleChange}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required='true'
                type="password"
                placeholder="Password"
                value={password}
                className="sharp loginTextArea"
                onChange={PasswordhandleChange}

              />
            </Form.Group>
            <Form.Group className="my-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required='true'
                type="password"
                placeholder="Password"
                value={confirmPassword}
                className="sharp loginTextArea"
                onChange={ConfirmPasswordhandleChange}

              />
            </Form.Group>
            <Button
              type="submit"
              className="sharp updateButton "
              variant="dark"
            >
              {Name}
            </Button>
          </Form>
</Container>        
    )
}

export default MyForm

import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import _ from "lodash";
import Message from "../Components/Message";
import "../Components/MyForm.css";
import { useSelector } from "react-redux";

const MyForm = ({ Title, user, Name, Submit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorfront, setError] = useState("");
  const [governorate,setGovernorate]= useState('')  
  const [district,setDistrict]= useState('')  
  const [street,setStreet]= useState('')  
  const [building,setBuilding]= useState('')  
  const [addDetails,setAddDetails]= useState('')  
  const [tel,setTel]= useState('')  
  const userRegister = useSelector(state => state.userRegister)
  const {error} = userRegister
  const SubmitUpdate = (e) => {
    e.preventDefault();
    Submit(name, email, tel,password, confirmPassword,governorate,district,street,building,addDetails, setError);
  };

  return (
    <Container>
      <Form className="my-3" onSubmit={SubmitUpdate}>
        <h3 className="my-3">{Title}</h3>
        {/* {loading && <Loading className='mx-5 my-4' />} */}
        {(error || errorfront) && (
          <Message className="mx-5 my-4" variant="danger">
            {errorfront ? errorfront : error }
          </Message>
        ) }
        <Form.Group className="my-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder={user ? user.name : "Name"}
            value={name}
            className="sharp loginTextArea"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Row className="mb-3">  
        <Form.Group as={Col} className="my-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required={true}
            type="email"
            placeholder={user ? user.email : "a@example.com"}
            value={email}
            className="sharp loginTextArea"
            onChange={(e) => setEmail(e.target.value)}
                      />
        </Form.Group>
        <Form.Group as={Col} className="my-3" controlId="formBasicTel">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder={user ? user.tel : "eg.01234567891"}
            value={tel}
            className="sharp loginTextArea"
            onChange={(e) => setTel(e.target.value)}
                      />
        </Form.Group>
        

        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="my-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required={true}
              type="password"
              placeholder="Password"
              value={password}
              className="sharp loginTextArea"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="my-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required={true}
              type="password"
              placeholder="Password"
              value={confirmPassword}
              className="sharp loginTextArea"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Governorate (Muhafaza)</Form.Label>
            <Form.Control 
            required={true}
            className="sharp loginTextArea"
            placeholder="eg.Cairo"
            value = {governorate}
            onChange={(e) => setGovernorate(e.target.value)}
             />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formGridDistrict">
            <Form.Label>State</Form.Label>
            <Form.Select
              className="sharp loginTextArea"
              defaultValue="Choose..."
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group> */}

          <Form.Group as={Col} controlId="formGridDistrict">
            <Form.Label>District</Form.Label>
            <Form.Control
            required={true} 
            className="sharp loginTextArea"
            placeholder='eg.Nasr City'
            value = {district}
            onChange={(e) => setDistrict(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control 
            required={true}
            className="sharp loginTextArea"
            placeholder="eg.Abbas El Akkad St."
            value = {street}
            onChange={(e) => setStreet(e.target.value)}
           />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridBuilding">
            <Form.Label>Building No</Form.Label>
            <Form.Control 
            required={true}
            className="sharp loginTextArea"
            placeholder='eg.31' 
            value = {building}
            onChange={(e) => setBuilding(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address details</Form.Label>
          <Form.Control
            className="sharp loginTextArea"
            placeholder="Address details"
            value = {addDetails}
            onChange={(e) => setAddDetails(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="sharp updateButton " variant="dark">
          {Name}
        </Button>
      </Form>
    </Container>
  );
};

export default MyForm;

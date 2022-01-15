import _ from 'lodash';
import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MyForm from '../Components/MyForm';
import { useNavigate } from 'react-router';
import { register } from '../actions/userActions';
const RegisterScreen = () => {
    
    const userLogin = useSelector(state => state.userLogin)
    const {user} = userLogin
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    useEffect(() => {
        if (_.has(user,'_id') )
        {
            Navigate('/')
        }
    }, [user])
    const submitRegister = (name,email,tel,password,confirmPassword,governorate,district,street,building,addDetails,setError) => {
        // if (_.isEmpty(password) || _.isEmpty(password) || _.isEmpty(password) || _.isEmpty(password))
        // {setError('All fields are required')}
        if (!_.isEqual(password, confirmPassword))
         { setError ( "Passwords are not matching")}
        else  {
          dispatch(register({name:name, email:email,tel:tel ,password:password,address :{addDetails,governorate,district,street,building},cart:[]}));
          console.log(name,email,password,{addDetails,governorate,district,street,building})
        }
        
      };
    
    
    return (
        <Container>
            <MyForm  Name='Register' Title='Create an account' Submit={submitRegister}></MyForm>
        </Container>        
    )
}

export default RegisterScreen

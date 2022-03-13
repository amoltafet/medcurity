import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import emailValidator from "email-validator"
import { passwordStrength } from 'check-password-strength'
import './RegisterPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main login page. 
* @return {RegisterPage}
*/

export default function RegisterPage()
{

  Axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };

  const register = () => {

    if (email.length > 0 || password.length > 0)
    {
      let isValidPass  = checkPassword(password)
      let isValidEmail = checkEmail(email)

      if (isValidPass.result && isValidEmail.result)
      {
        Axios.post("http://localhost:3002/users/register", { email: email, password: password }).then((response) => 
        {
          if (response.data === true)
          {
            navigate('/dash');
          }
          else if (response.data === false)
          {
            setMessage('This email is already in use! Please go back to the login page by clicking the "Back to Login" button.')
          }
        });
      }
      else
      {
        setMessage([isValidEmail.message, <br/>, isValidPass.message])
      }
    }
    else
    {
      setMessage('You need to enter an email and password!')
    }
  };

  const checkEmail = (emailString) => 
  {
    if (emailValidator.validate(emailString))
    {
      return { result: true, message: null}
    }
    else
    {
      //return [false, `That's not a valid email address!`]
      return { result: false, message: `That's not a valid email address!`}
    }
  }

  const checkPassword = (passwordString) => 
  {
    if (passwordStrength(passwordString).contains.length == 4)
    {
      if (passwordStrength(passwordString).id > 1)
      {
        return { result: true, message: null}
      }
      else
      {
        //return [false, `Your password is too weak! Please enter a stronger password.`]
        return { result: false, message: `Your password is too weak! Please enter a stronger password.` }
      }
    }
    else
    {
      //return [false, `Your password must contain the following: lowercase letter, uppercase letter, symbol, number`]
      return { result: false, message: `Your password must contain the following: lowercase letter, uppercase letter, symbol, number` }
    }
  }
  
  return (
      <>
      <Form className="registerbg img-fluid">
        <a href="/">
        <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
        </a>
          <Card className="registerCard">
            <Card.Text className="header">Medcurity Learn Security</Card.Text>
            <Card.Text className="body">
              After creating your account, you'll be able to access the various HIPAA learning content.
            </Card.Text>
          </Card>
        <Form className="emailAndPass">
          <Form.Text className="registerHeader">Create an account for Medcurity Learn Security</Form.Text>
            <Form.Group className="email" controlId="formEmail">
              <Form.Control 
                type="email" 
                placeholder="Email" 
                onChange={ (e) => 
                {
                  setEmail(e.target.value);
                }}/>
            </Form.Group>
            <Form.Group className="pass" controlId="formPassword">
              <Form.Control 
                type="password" 
                placeholder="Password"
                onChange={ (e) => 
                {
                  setPassword(e.target.value);
                }}/> 
              <Button className="loginRegisterBtn" variant="secondary" type="button" onClick={login}>Back to Login</Button>
              <Button className="createButton" variant="secondary" type="button" onClick={register}>Register</Button>
              <Form.Text className="registerMessage">{message}</Form.Text>
            </Form.Group>
        </Form>
      </Form>
      </>
  );
}


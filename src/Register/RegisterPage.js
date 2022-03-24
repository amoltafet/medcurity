import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import './RegisterPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main registration page. 
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
      console.log("REGISTER CALLED")
      Axios.post("http://localhost:3002/users/register", { email: email, password: password }).then((response) => 
      {
        if (response.data.result === true)
        {
          setMessage(response.data.message)
          navigate('/dash');
        }
        else if (response.data.result === false)
        {
          setMessage(response.data.message.join(" "))
        }
      });
    }
    else
    {
      let registerMessage = ""
      if (email <= 0) registerMessage += "Email required. "
      if (password <= 0) registerMessage += "Password required. "
      setMessage(registerMessage)
    }
  };
  
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
              <Button className="createRegButton" variant="secondary" type="button" onClick={register}>Register</Button>
              <Button className="loginRegisterBtn" variant="secondary" type="button" onClick={login}>Back to Login</Button>
              <Form.Text className="registerMessage">{message}</Form.Text>
            </Form.Group>
        </Form>
      </Form>
      </>
  );
}


import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main login page. 
* @return {LoginPage}
*/

export default function LoginPage()
{
  //Axios.defaults.withCredentials = true;

  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    console.log('LOGGING IN', email, password)
    let credential_requirements = " "
    
    if (email <= 0 || password <= 0)
    {
      if (email <= 0) credential_requirements += "Email required. "
      if (password <= 0) credential_requirements += "Password required. "
      console.log(credential_requirements)
      setMessage(credential_requirements)
    }
    else
    {
      setMessage(credential_requirements)
      Axios.post("http://localhost:3002/api/login",
      { 
        email: email,
        password: password
      }).then((response) => 
      {
        console.log("response.data =", response.data)
        if (response.data.success === true)
        {
          setMessage(response.data.message)
          navigate('/dash');
        }
        else if (response.data.success === false)
        {
          setMessage(response.data.message)
        }
      });
      }

  };

  const register = () => {
    navigate('/register');
  };
  
      return (
          <>
          <Form className="loginbg img-fluid">
            <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
              <Card className="loginCard">
                <Card.Text className="header">Medcurity Learn Security</Card.Text>
                <Card.Text className="body">
                  To access your Medcurity Learn Security Dashboard please enter your login credentials.
                </Card.Text>
              </Card>
            <Form className="emailAndPass">
              <Form.Text className="loginHeader">Login to Medcurity Learn Security</Form.Text>
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
                  <Button className="loginButton" variant="secondary" type="button" onClick={login}>Login</Button>
                  <Button className="registerButton" variant="secondary" type="button" onClick={register}>Register</Button>
                </Form.Group>
                <Form.Text className="loginMessage">{message}</Form.Text>
            </Form>
          </Form>
          </>
      );
}


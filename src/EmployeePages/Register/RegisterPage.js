import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
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

  const register = () => {
    console.log('REGISTERING', email, password)
    Axios.post("http://localhost:3002/users/register",
    { 
      email: email,
      password: password
    }).then((response) => 
    {
      console.log("response.data =", response.data)
      if (response.data === true)
      {
        console.log("A new user!")
        navigate('/dash');
      }
      else if (response.data === false)
      {
        console.log("Already has account!")
        setMessage('This email is already in use! Please go back to the login page by clicking the Medcurity logo.')
      }
    }).catch(error => console.error(`Error ${error}`));
  };

  const login = () => {
    navigate('/');
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
                  <Button className="loginRegisterBtn" variant="secondary" type="button" onClick={login}>Login</Button>
                  <Button className="createButton" variant="secondary" type="button" onClick={register}>Register</Button>
                </Form.Group>
                <Form.Text className="registerMessage">{message}</Form.Text>
            </Form>
          </Form>
          </>
      );
}


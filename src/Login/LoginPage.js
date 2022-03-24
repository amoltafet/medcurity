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
  Axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {    

    if (email.length > 0 || password.length > 0)
    {
      Axios.post("http://localhost:3002/users/login", { email: email, password: password }).then((response) => 
      {
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
    else
    {
      let loginMessage = ""
      if (email <= 0) loginMessage += "Email required. "
      if (password <= 0) loginMessage += "Password required. "
      setMessage(loginMessage)
    };
  }

  const register = () => {
    navigate('/register');
  };

  return (
      <>
      <Form className="loginbg img-fluid">
        <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
            <Card className="login_loginCard">
              <Card.Text className="header">Medcurity Learn Security</Card.Text>
              <Card.Text className="body">
                To access your Medcurity Learn Security Dashboard please enter your login credentials.
              </Card.Text>
            </Card>
        <Form className="login_columnDivder"> 
            <div class="row justify-content-md-center">
              <div class="col-xs-5 col-md-5">
                <h3 class="login_h3">Login to Medcurity Learn Security</h3>
                <p class="login_p">Already have an account? Please login!</p>
                <Form.Group className="login_emailForm" controlId="formEmail"> <Form.Control type="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value); }}/> </Form.Group>
                <br></br>
                <Form.Group className="login_passForm" controlId="formPassword"> <Form.Control type="password" placeholder="Password" onChange={ (e) => {setEmail(e.target.value); }}/> </Form.Group>
                <br></br>
                <p class="login_loginResponse">{message}</p>
                <Button className="login_loginButton" onClick={login} variant="secondary" type="button">Login with Existing Account</Button>
                <br></br>
                <br></br>
                <a class="login_forgotPass" href="/">Forgot password?</a>
              </div>
              
              <div class="col-xs-5 col-md-5">
                <h3 class="login_h3">Need an account?</h3>
                <p class="login_p">Creating a new account is quick and easy. Get started here!</p>
                <Button className="login_registerButton" onClick={register} variant="secondary" type="button">Register a New Account</Button>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


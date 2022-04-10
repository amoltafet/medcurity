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
      <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
      <Form className="register_columnDivder"> 
            <div className="row justify-content-md-center">
              <div className="col-xs-5 col-md-5">
                <div className="register_formColumn row justify-content-center">
                  <h3 className="register_h3">Create an Account</h3>
                  <p className="register_p">All you need is an email and password to create an account.</p>
                  <Form.Group className="register_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value); }}/> </Form.Group>
                  <p></p>
                  <Form.Group className="register_Form" controlId="formPassword"> <Form.Control type="password" placeholder="Password" onChange={ (e) => {setPassword(e.target.value); }}/> </Form.Group>
                  <p className="register_registerResponse">{message}</p>
                  <Button className="register_button" onClick={register} variant="secondary" type="button">Create Account</Button>
                  <Button className="register_button" onClick={login} variant="secondary" type="button">Back to Login Page</Button>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


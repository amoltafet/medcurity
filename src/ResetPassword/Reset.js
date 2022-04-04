import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import './Reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main registration page. 
* @return {RegisterPage}
*/

export default function ReseetPasswordPage()
{

  Axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };
  
  return (
      <>
      <Form className="reset_passwordbg img-fluid">
      <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
      <Form className="reset_password_columnDivder"> 
            <div class="row justify-content-md-center">
              <div class="col-xs-5 col-md-5">
                <div class="reset_password_formColumn row justify-content-center">
                  <h3 class="reset_password_h3">Reset Password</h3>
                  <p class="reset_password_p">First verify you're you, by entering your email for a confirmation code.</p>
                  <Form.Group className="reset_password_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email"/> </Form.Group>
                  <p></p>
                  <Button  className="send_code_button" variant="secondary" type="button">Send Email Verification Code</Button>
                  <Button className="reset_password_button" onClick={login} variant="secondary" type="button">Back to Login Page</Button>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


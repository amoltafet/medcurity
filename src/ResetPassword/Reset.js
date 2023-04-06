import {Button, Image, Form} from 'react-bootstrap'
import React from 'react';
import axios from "axios"
import './Reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main registration page. 
* @return {RegisterPage}
*/

export default function ReseetPasswordPage()
{

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };

  const sendResetLink = () => {
    setTimeout(() => navigate('/resetLinkSent'), 500);
  };
  
  return (
      <>
      <Form className="reset_passwordbg img-fluid">
      <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
      <Form className="reset_password_columnDivder"> 
            <div className="row justify-content-md-center">
              <div className="col-xs-5 col-md-5">
                <div className="reset_password_formColumn row justify-content-center">
                  <h3 className="reset_password_h3">Reset Password</h3>
                  <p className="reset_password_p">Enter your email below to receive a password reset link.</p>
                  <Form.Group className="reset_password_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email"/> </Form.Group>
                  <p></p>
                  <Button className="send_code_button" onClick={sendResetLink} variant="secondary" type="button">Send Password Reset Link</Button>
                  <Button className="reset_password_button" onClick={login} variant="secondary" type="button">Back to Login Page</Button>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


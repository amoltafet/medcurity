import {Button, Image, Form} from 'react-bootstrap'
import React from 'react';
import axios from "axios"
import './Reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
* Creates and displays the main registration page. 
* @return {RegisterPage}
*/

export default function ReseetPasswordPage()
{

  axios.defaults.withCredentials = true;

  const [inputtedEmail, setInputtedEmail] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };

  const redo = () => {
    navigate('/resetPassword');
  };

  const sendResetLink = () => {
    // First, find out if the inputted email exists in the database
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
      params: {
          the_query:
              `SELECT userid, email FROM users WHERE email = '${inputtedEmail}'`
      }
    }).then((response) => {
      if (response.data.length !== 0) {
        var userid = response.data[0].userid;
        var useremail = response.data[0].email;
        // Next, construct a password reset token and add it to the database alongside userid and an expiration time/date
        // Then, send a password reset link to the inputted email
        axios.post(`${process.env.REACT_APP_BASE_URL}/email/addPasswordResetToken`,
        {
            userid: userid,
            email: useremail
        }).then((response) => {
        });
      }
    });
    setTimeout(() => navigate('/resetLinkSent'), 500);
  };
  
  if (queryParameters.has("token")) {

    const token = queryParameters.get("token");

    axios.post(`${process.env.REACT_APP_BASE_URL}/email/getDetailsFromPasswordResetToken`,
    {
      token: token
    }).then((response) => {
      console.log(response);
      if (response.data.length !== 0) { // token exists in the database
        return (
          <>
          <p>Token: {token}</p>
          </>
        )
      } else { // token doesn't exist in the database
        return (
          <>
          <Form className="reset_passwordbg img-fluid">
          <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
          <Form className="reset_password_columnDivder"> 
                <div className="row justify-content-md-center">
                  <div className="col-xs-5 col-md-5">
                    <div className="reset_password_formColumn row justify-content-center">
                      <h3 className="reset_password_h3">There's been an error...</h3>
                      <p className="reset_password_p">That link didn't seem to work. Try again below:</p>
                      <Button className="send_code_button" onClick={redo} variant="secondary" type="button">Send Another Reset Link</Button>
                    </div>
                  </div>
                </div>
            </Form>
          </Form>
          </>
        );
      }
    });
    
  } else {
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
                    <Form.Group className="reset_password_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email" onChange={(e) => {setInputtedEmail(e.target.value);}}/> </Form.Group>
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

}

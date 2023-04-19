import {Button, Image, Form} from 'react-bootstrap'
import React from 'react';
import axios from "axios"
import './Reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

export default function ResetLinkSentPage()
{

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };
  
  return (
      <>
      <Form className="reset_passwordbg img-fluid">
      <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
      <Form className="reset_password_columnDivder"> 
            <div className="row justify-content-md-center">
              <div className="col-xs-5 col-md-5">
                <div className="reset_password_formColumn row justify-content-center">
                  <h3 className="reset_password_h3">Password Reset!</h3>
                  <p className="reset_password_p">Your password has successfully been changed.</p>
                  <Button className="reset_password_button" onClick={login} variant="secondary" type="button">Back to Login Page</Button>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


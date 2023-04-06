import {Button, Image, Form} from 'react-bootstrap'
import React from 'react';
import axios from "axios"
import './Reset.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ResetLinkSentPage()
{

  axios.defaults.withCredentials = true;
  
  return (
      <>
      <Form className="reset_passwordbg img-fluid">
      <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
      <Form className="reset_password_columnDivder"> 
            <div className="row justify-content-md-center">
              <div className="col-xs-5 col-md-5">
                <div className="reset_password_formColumn row justify-content-center">
                  <h3 className="reset_password_h3">Reset Password Link Sent</h3>
                  <p className="reset_password_p">If the email is registered, then a link will arrive in your inbox shortly.</p>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
}


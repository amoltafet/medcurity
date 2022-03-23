import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import './InvalidPage.css';
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the main login page. 
* @return {InvalidPage}
*/

export default function InvalidPage()
{
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const backToSafety = () => {
    navigate('/');
  };

  return (
      <>
      <Form className="invalidbg">
        <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
        <Form className="somethingelse">
          <Form.Text className="errorHeader">Oops!</Form.Text>
          <br></br>
          <Form.Text className="errorHeader2">We're not sure how you got here, but let's get you back to learning!</Form.Text>
          <br></br>
          <Button className="redirectButton" onClick={backToSafety} variant="secondary" type="button" >Back to Medcurity Learn Security</Button>
        </Form>
      </Form>
      </>
  );
}


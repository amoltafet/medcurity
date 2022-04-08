import { Nav, Row, Form, Tab, Col, Container, Button, Popover, OverlayTrigger, Image } from 'react-bootstrap';
import React from 'react';
import { useState } from "react";
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import './InvalidPage.css';
import { useNavigate } from 'react-router-dom';

/**
* Creates a page notifying the user that access to a certain page
* is denied or invalid.
* @return {InvalidPage}
*/

export default function InvalidPage(props)
{
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate(props?.redirectPage || "/");
  };

  return (
    <>
      <Image className='MedcurityLogo' src="/Medcurity_Logo.png" variant="top" alt="" />
      <Form className='invalid_bodyForm img-fluid'>
        <Col className='invalid_bodyCol rounded'>
          <Row className='invalid_headerRow'>
            <Image className="invalid_lockImg" src="/invalid_lock.png" variant="top" alt="" />
            <h2 className='invalid_h1'>Oops! We're not sure how you got here, but...</h2>
            <div className="invalid_messageDiv">
              <h5 className='invalid_h5'>{props?.reason || "This page does not exist."}</h5>
            </div>
            <Button className="invalid_redirectButton" onClick={navToLogin} variant="secondary" type="button" >{props?.btnMessage || "Back to Medcurity Learn Security"}</Button>
          </Row>
        </Col>
      </Form>
    </>
  );
}

/*

    <>
      <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
      <Form className="somethingelse">
        <Form.Text className="errorHeader">Oops!</Form.Text>
        <br></br>
        <Form.Text className="errorHeader2">We're not sure how you got here, but let's get you back to learning!</Form.Text>
        <br></br>
        <Button className="redirectButton" onClick={navToLogin} variant="secondary" type="button" >Back to Medcurity Learn Security</Button>
      </Form>
    </>

*/
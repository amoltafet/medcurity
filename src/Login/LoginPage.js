import React from 'react';
import {  Form, Image } from 'react-bootstrap';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'



function LoginPage () {
  return (
    <>
        <Image className="loginbg img-fluid" variant="top" src="/loginbg.png" alt=""></Image>
        <Form>
            <Form.Group>
                <Form.Label>Login to Medcurity Learn Security</Form.Label>
                <Form.Control type="email" placeholder="Email@example.com"/>
                <Form.Text className="text-muted"/>
            </Form.Group>
        </Form>
    </>
  );
}

export default LoginPage;

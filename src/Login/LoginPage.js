import {Button, Image, Form, Card} from 'react-bootstrap'
import React from 'react';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage = () => {
    return (
        <>
        <Form className="loginbg img-fluid">
          <Image className="MedcurityLogo justify-content-bottom" variant="top" src="/Medcurity_Logo.png" alt="" />
            <Card className="loginCard">
              <Card.Text className="header">Medcurity Learn Security</Card.Text>
              <Card.Text className="body">
                To access your Medcurity Learn Security Dashboard please enter your login credentials.
              </Card.Text>
            </Card>
          <Form className="emailAndPass">
            <Form.Text className="loginHeader">Login to Medcurity Learn Security</Form.Text>
              <Form.Group className="email" controlId="formEmail">
                <Form.Control type="email" placeholder="Email"/>
              </Form.Group>
              <Form.Group className="pass" controlId="formPassword">
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
                <Button className="loginButton" href="/dash" variant="secondary" type="submit">Proceed to Dashboard</Button>
          </Form>
        </Form>
        </>
    );
}
export default LoginPage;
import {Button, Form, Container} from 'react-bootstrap'
import React from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
    return (
        <>
        <Container>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="email"/>
            <Form.Text>
            We'll never share the email
            </Form.Text>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password"/>
          </Form.Group>
          <Button variant="secondary" type="submit">login</Button>
        </Form>
        </Container>
        </>
    );
}
export default Login;
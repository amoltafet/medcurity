import React from 'react';
import './LoginImage.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Image} from 'react-bootstrap'

const LoginImage = () => {
  return (
    <>
    <Container className="loginContainer">
        <Image className="loginImage" variant="top" src="/login.jpg" alt=""></Image>
        <Button href="/dashboard">Login</Button>
    </Container>
    </>
  );
}

export default LoginImage;

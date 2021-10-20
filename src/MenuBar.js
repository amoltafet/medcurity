import React from 'react';
import './MenuBar.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, CardImg, Card, Row, Container, CardGroup} from 'react-bootstrap'

const MenuBar = () => {
  return (
    <>
    <CardGroup>
    <Card className="logo">
      <CardImg className="MedcurityLogo" variant="top" src="/Medcurity_Logo.png" alt="" roundedCircle />
      </Card>
    <Card className="pills">
      <Nav className="justify-content-end" variant="pills" defaultActiveKey="home" >
        <Nav.Item>
          <Nav.Link href="home">Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="home">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
      </Card>
      </CardGroup>
 
    </>
  );
}

export default MenuBar;

import React from 'react';
import './MenuBar.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav} from 'react-bootstrap'

const MenuBar = () => {
  return (
    <>
      <Nav className="justify-content-end" variant="pills" defaultActiveKey="home" >
        <Nav.Item>
          <Nav.Link href="home">Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="home">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default MenuBar;

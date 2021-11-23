import React from 'react';
import './MenuBarDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, CardImg, Card, CardGroup} from 'react-bootstrap'

const MenuBarDashboard = () =>  {
  return (
    <>
    <CardGroup>
    <Card className="logo">
    <a href="/dash">
      <CardImg className="MedcurityLogo" variant="top" href="/dash" src="/Medcurity_Logo.png" alt="" />
      </a>
      </Card>
    <Card className="pills">
      <Nav className="justify-content-end" variant="pills" defaultActiveKey="/dash">
      <Nav.Item className="navPills uvs-left uvs-right">
          <Nav.Link className="font" href="/settings">Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item className="navPills uvs-left uvs-right">
          <Nav.Link className="font" href="/">Logout</Nav.Link>
        </Nav.Item>
     
      </Nav>
    </Card>
    </CardGroup>
    </>
  );
}

export default MenuBarDashboard;


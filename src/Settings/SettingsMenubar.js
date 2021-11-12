import React, {Component} from 'react';
import './SettingsMenubar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, CardImg, Card, CardGroup} from 'react-bootstrap'

const SettingsMenubar = () =>  {
 
  return (
    <>
    <CardGroup>
        <Card className="logo">
        <a href="/dash">
            <CardImg className="MedcurityLogo" variant="top" src="/Medcurity_Logo.png" alt="" />
            </a>
        </Card>
        <Card className="pills">
            <Nav className="justify-content-end" variant="pills" defaultActiveKey="/dashboard">
                <Nav.Item className="navPills uvs-left uvs-right">
                    <Nav.Link className="font" href="/">Logout</Nav.Link>
                </Nav.Item>
            </Nav>
      </Card>
    </CardGroup>
    </>
  );

}

export default SettingsMenubar;


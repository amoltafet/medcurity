import { Image, Card } from 'react-bootstrap'
import React from 'react';
import './WelcomePanel.css';
import './../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from "axios"
import { useEffect, useState } from "react";

/**
* Creates and displays the main welcome panel for the user. 
* @return {WelcomePanel}
*/
const WelcomePanel = (props) => {
    console.log("explain", props.user)

    return (
        <>
        <Card className="WelcomePanelCard uvs-right uvs-left" style={{flexDirection: 'row'}}>
            <Image className="WelcomePanelImage" variant="top" src="/user.png" alt="" roundedCircle />
            <Card.Body className="cardSize">
               <Card.Title className="titleFont" >Welcome Back {props.user.username}!</Card.Title>
               <div>{props.subtitle}</div>
            </Card.Body> 
        </Card>

        </>
    );
}
export default WelcomePanel;
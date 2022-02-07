import {Image, Card} from 'react-bootstrap'
import React from 'react';
import './WelcomePanel.css';
import './../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
* Creates and displays the main welcome panel for the user. 
* @return {WelcomePanel}
*/
const WelcomePanel = () => {
    return (
        <>
        <Card className="WelcomePanelCard uvs-right uvs-left" style={{flexDirection: 'row'}}>
            <Image className="WelcomePanelImage" variant="top" src="/user.png" alt="" roundedCircle />
            <Card.Body className="cardSize">
               <Card.Title className="titleFont" >Welcome Back User!</Card.Title>
            </Card.Body> 
        </Card>

        </>
    );
}
export default WelcomePanel;
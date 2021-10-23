import {Row, CardImg, Card} from 'react-bootstrap'
import React from 'react';
import './WelcomePanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const WelcomePanel = () => {
    return (
        <>
        <Row>
        <Card className="WelcomePanelCard uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row'}}>
            <CardImg className="WelcomePanelImage" variant="top" src="/user.png" alt="" roundedCircle />
            <Card.Body>
               <Card.Title>Welcome Back User!</Card.Title>
            </Card.Body> 
        </Card>
        </Row>
        </>
    );
}
export default WelcomePanel;
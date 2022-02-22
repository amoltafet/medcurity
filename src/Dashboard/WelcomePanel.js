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
const WelcomePanel = () => {
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        });
      }, []);

    console.log(session)

    return (
        <>
        <Card className="WelcomePanelCard uvs-right uvs-left" style={{flexDirection: 'row'}}>
            <Image className="WelcomePanelImage" variant="top" src="/user.png" alt="" roundedCircle />
            <Card.Body className="cardSize">
               <Card.Title className="titleFont" >Welcome Back {session.username}!</Card.Title>
            </Card.Body> 
        </Card>

        </>
    );
}
export default WelcomePanel;
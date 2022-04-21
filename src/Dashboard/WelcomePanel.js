import { Image, Card } from 'react-bootstrap'
import React from 'react';
import './WelcomePanel.css';
import './../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import { useEffect, useState } from "react";
// import env from "react-dotenv";

/**
* Creates and displays the main welcome panel for the user. 
* @return {WelcomePanel}
*/
const WelcomePanel = (props) => {
     axios.defaults.withCredentials = true;
    const [profilePic, setProfilePic] = useState("")
    useEffect(() => { if (props.user.userid)  axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: props.user.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    

    return (
        <>
        <Card className="WelcomePanelCard uvs-left" style={{flexDirection: 'row'}}>
        <Image className="WelcomePanelImage uvs-left" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
            <Card.Body className="cardSize">
               <Card.Title className="titleFont" >Welcome Back, {props.user.username} to the {props.pageTitle}!</Card.Title>
            </Card.Body> 
        </Card>
        </>
    );
}
export default WelcomePanel;
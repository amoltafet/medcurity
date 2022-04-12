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
    Axios.defaults.withCredentials = true;
    const [profilePic, setProfilePic] = useState("")
    useEffect(() => { if (props.user.userid) Axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: props.user.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    

    return (
        <>
        <Card className="WelcomePanelCard uvs-left" style={{flexDirection: 'row'}}>
        <Image className="WelcomePanelImage uvs-left" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
            <Card.Body className="cardSize">
               <Card.Title className="titleFont" >Welcome Back, {props.user.username} to the Employer Dashboard!</Card.Title>
            </Card.Body> 
        </Card>
        </>
    );
}
export default WelcomePanel;
import { Image, Card } from 'react-bootstrap'
import React from 'react';
import './WelcomePanel.css';
import './../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import { useEffect, useState } from "react";
import { Typography } from '@material-ui/core';
// import env from "react-dotenv";

/**
* Creates and displays the main welcome panel for the user. 
* @return {WelcomePanel}
*/
const WelcomePanel = (props) => {
     axios.defaults.withCredentials = true;
    const [profilePic, setProfilePic] = useState("")
    useEffect(() => { if (props.user.userid)  axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: props.user.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    let user = "User";
    if (props.user) {
        user = props.user.username;
    }

    return (
        <>
        <div className=" uvs-left" style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', marginLeft: '2rem'}}>
        <Image className="WelcomePanelImage uvs-left" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
               <Typography variant="h3" gutterBottom style={{
                
               }}>
                    Welcome Back, {user} to the {props.pageTitle}!
                </Typography>
              
        </div>
        </>
    );
}
export default WelcomePanel;
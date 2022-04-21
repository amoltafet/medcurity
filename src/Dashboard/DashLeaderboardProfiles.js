// <div>Icons made by <a href="https://www.flaticon.com/authors/kliwir-art" title="kliwir art">kliwir art</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Image,  Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from "react";
import './DashLeaderboardProfiles.css'
import env from "react-dotenv";

 /**
    * Creates each profile displayed on the dashboard.
    * @param {user} user holds all of the info for the user.
    * @return {GetPage}
    */
function DashLeaderboardProfiles (props) {
    const [profilePic, setProfilePic] = useState("")

    axios.defaults.withCredentials = true;

    useEffect(() => { if (props.userid) axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: props.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    return (
        <>
            <Card className="cardBackgroundDash" style={{ flexDirection: 'row' }}>
                <Col xs={2} lg>
                    <div className="dashLeaderNumberPosition">{props.index}.</div>
                </Col>
                <Col xs={2} lg>
                    <Image className="profileImageDash" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
                </Col>
                <Col xs={4} lg>
                    <div className="userTextDash">{props.name}</div>
                </Col>
                <Col xs={3} lg> 
                    <div body className="pointsDash">points: {props.score}</div> 
                 </Col>   
               
            </Card>
        </>
    );
}

export default DashLeaderboardProfiles;
// <div>Icons made by <a href="https://www.flaticon.com/authors/kliwir-art" title="kliwir art">kliwir art</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Image,  Col, Row } from 'react-bootstrap';
import Axios from 'axios';
import { useEffect, useState } from "react";
import './DashLeaderboardProfiles.css'

 /**
    * Creates each profile displayed on the dashboard.
    * @param {user} user holds all of the info for the user.
    * @return {GetPage}
    */
function DashLeaderboardProfiles (props) {
    const [profilePic, setProfilePic] = useState("")

    Axios.defaults.withCredentials = true;
    console.log('from DashLBProfiles:', props)

    useEffect(() => { if (props.userid) Axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: props.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    return (
        <>
            <Card className="cardBackgroundDash" style={{ flexDirection: 'row' }}>
                <Col>
                    <div className="dashLeaderNumberPosition">{props.index}.</div>
                </Col>
                <Col>
                    <Image className="profileImageDash" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
                </Col>
                <Col>
                    <div className="userTextDash">{props.name}</div>
                </Col>
                <Col>
                 <div className="scoreTextDash">Score</ div>
                </Col>
                <Col>
                    <div body className="pointsDash">{props.score}</div> 
                </Col>   
            </Card>
        </>
    );
}

export default DashLeaderboardProfiles;
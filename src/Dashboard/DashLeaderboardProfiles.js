// <div>Icons made by <a href="https://www.flaticon.com/authors/kliwir-art" title="kliwir art">kliwir art</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Image,  Col } from 'react-bootstrap';
import Axios from 'axios';
import './DashLeaderboardProfiles.css'

 /**
    * Creates each profile displayed on the dashboard.
    * @param {user} user holds all of the info for the user.
    * @return {GetPage}
    */
function DashLeaderboardProfiles (props) {
    Axios.defaults.withCredentials = true;
    return (
        <>
            <Card className="cardBackgroundDash" style={{ flexDirection: 'row' }}>
                <Col sm>
                    <div className="dashLeaderNumberPosition">{props.index}.</div>
                </Col>
                <Col sm>
                    <Image className="profileImageDash" src="/user.png" alt="" roundedCircle />
                </Col>
                <Col sm>
                    <div className="userTextDash">{props.name}</div>
                </Col>
                <Col sm>
                 <div className="scoreTextDash">Score</ div>
                </Col>
                <Col sm>
                    <div body className="pointsDash">{props.score}</div> 
                </Col>   
            </Card>
        </>
    );
}

export default DashLeaderboardProfiles;
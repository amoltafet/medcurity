// <div>Icons made by <a href="https://www.flaticon.com/authors/kliwir-art" title="kliwir art">kliwir art</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Image,  Col } from 'react-bootstrap';
import './DashLeaderboardProfiles.css'

 /**
    * Creates each profile displayed on the dashboard.
    * @param {user} user holds all of the info for the user.
    * @return {GetPage}
    */
function DashLeaderboardProfiles(props) {
    return (
        <>
            <Card className="cardBackgroundDash" style={{ flexDirection: 'row' }}>
                <Col>
                    <Card.Text className="text-center dashLeaderNumberPosition">{props.index}.</Card.Text>
                </Col>
                <Col>
                    <Image className="profileImageDash" src="/user.png" alt="" roundedCircle />
                </Col>
                <Col>
                    <Card.Text className="text-center userTextDash">{props.name}</Card.Text>
                </Col>
                <Col>
                 <Card.Title className="text-center scoreTextDash">Score</Card.Title>
                </Col>
                <Col>
                    <Card.Title body className="text-center pointsDash">{props.user.overallPoints}</Card.Title> 
                </Col>   
            </Card>
        </>
    );
}

export default DashLeaderboardProfiles;
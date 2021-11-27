// <div>Icons made by <a href="https://www.flaticon.com/authors/kliwir-art" title="kliwir art">kliwir art</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Card, Image, Row } from 'react-bootstrap';
import './DashLeaderboardProfiles.css'

function DashLeaderboardProfiles(props) {
    return (
        <>
            <Card className="cardBackgroundDash" style={{ flexDirection: 'row' }}>
                <Image className="profileImageDash" src="/user.png" alt="" roundedCircle />
                <Card.Text className="userTextDash">{props.user.userName}</Card.Text>
                <Card.Title className="scoreTextDash">Score</Card.Title>
                <Card.Title body className="pointsDash">{props.user.overallPoints}</Card.Title>
                <Image className="statusImageDash" src="/upArrow.png" alt="" />
            </Card>
        </>
    );
}

export default DashLeaderboardProfiles;


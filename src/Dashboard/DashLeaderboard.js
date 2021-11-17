import {Card} from 'react-bootstrap'
import React from 'react';
import './DashLeaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Leaderboard = () => {
    return (
        <>
            <Card.Body className="LeaderboardCard uvs-right uvs-left">
               <Card.Link className="font" href="/leaderboard" >Leaderboard</Card.Link>
            </Card.Body> 
        </>
    );
}
export default Leaderboard;
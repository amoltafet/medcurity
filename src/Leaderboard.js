import {Card} from 'react-bootstrap'
import React from 'react';
import './Leaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Leaderboard = () => {
    return (
        <>
        <Card className="LeaderboardCard uvs-right uvs-left">
            <Card.Body>
               <Card.Title>Leaderboard</Card.Title>
            </Card.Body> 
        </Card>
        </>
    );
}
export default Leaderboard;
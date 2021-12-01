import {Card} from 'react-bootstrap'
import React from 'react';
import DashLeaderboardProfiles from './DashLeaderboardProfiles';
import './DashLeaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Leaderboard = () => {
    const user = {
        userName: "Bobby Boy",
        overallPoints: 50,
        category1TotalPoints: 0,
        category2TotalPoints: 0,
        category3TotalPoints: 0,
        category4TotalPoints: 0,
        category5TotalPoints: 0
    };
    
    var profileArray = [];
    
    const CreateDashUsers = () => {
        for (var i = 0; i < 3; i++) {
            profileArray.push(<DashLeaderboardProfiles user={user}/>)
        }
        return(profileArray)
    }
    return (
        <>
            <Card.Body className="LeaderboardCard uvs-right uvs-left">
               <Card.Link className="font" href="/leaderboard" >Leaderboard</Card.Link>
               <CreateDashUsers></CreateDashUsers>
            </Card.Body> 
        </>
    );
}
export default Leaderboard;
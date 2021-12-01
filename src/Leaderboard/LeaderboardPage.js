import React from 'react';
import Menubar from '../MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import { Container, Row } from 'react-bootstrap';
import './Leaderboard.css'


const LeaderboardPage = () => {
    const className = [
        "userPanel", 
        "userProfile", 
        "category", 
        "progressBar", 
    ];

    const user = {
        userName: "Bobby Boy",
        overallPoints: 20,
        category1TotalPoints: 11,
        category2TotalPoints: 22,
        category3TotalPoints: 33,
        category4TotalPoints: 44,
        category5TotalPoints: 55
    };
    
    var profileArray = [];
    
    const CreateUsers = () => {
        for (var i = 0; i < 8; i++) {
            profileArray.push(<LeaderboardProfile 
                name={user.userName} 
                user={user} 
                className={className}/>)
        }
        return(profileArray)
    }
    return (
        <>
            <Menubar></Menubar>
            <Container className="leaderboardContainer">
                <Row className="space"></Row>
                <CreateUsers></CreateUsers>
            </Container>
        </>
    );
}

export default LeaderboardPage
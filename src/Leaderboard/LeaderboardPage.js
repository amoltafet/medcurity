import React from 'react';
import Menubar from '../MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import { Card, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import './Leaderboard.css'




/**
* Creates the main container for the leaderboard. 
* @return {LeaderboardPage}
*/
const LeaderboardPage = () => {
    const [users, setUsers] = useState([])
    // remove 
    useEffect(() => {
      axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users' } }).then((response) => {
        setUsers(Object.values(response.data))
        });
    }, [])

    var className = [
        "userPanel", 
        "userProfile", 
        "category", 
        "progressBar", 
    ];

    var user = {
        userName: "Bobby Boy",
        overallPoints: 20,
        category1TotalPoints: 11,
        category2TotalPoints: 22,
        category3TotalPoints: 33,
        category4TotalPoints: 44,
        category5TotalPoints: 55
    };
    

    

    var index = 0;
    const ProfileArray = users.map((userProfile) => {
        console.log("user Prof", userProfile)
      index++;
      return (
            <LeaderboardProfile
                name={userProfile.username} 
                index={index}
                user={user} 
                className={className}/>
        );
    })
    
    return (
        <>
            <Menubar></Menubar>
            <Card className="leaderboardContainer">
                {ProfileArray}
            </Card>
        </>
    );
}

export default LeaderboardPage
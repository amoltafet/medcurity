import {Card} from 'react-bootstrap'
import React from 'react';
import DashLeaderboardProfiles from './DashLeaderboardProfiles';
import { useEffect, useState } from "react";
import axios from 'axios';
import './DashLeaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
* Creates and displays the leaderboard on the main dashboard. 
* @return {Leaderboard}
*/
const Leaderboard = () => {
    const [users, setUsers] = useState([])

    // Fetch User Data
    useEffect(() => {
      axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users' } }).then((response) => {
        setUsers(Object.values(response.data))
        });
    }, [])

    // for stylizing the panels
    var className = [
        "userPanel", 
        "userProfile", 
        "category", 
        "progressBar", 
    ];

    // temp data 
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
      index++;
      //const newData = data.concat({answer: "", correct: false});
      //setData(newData);
      return (
            <DashLeaderboardProfiles
                name={userProfile.username} 
                user={user} 
                className={className}/>
        );
    })
    return (
        <>
            <Card.Body className="LeaderboardCard uvs-right uvs-left">
               <Card.Link className="dashLeaderboardFont" href="/leaderboard" >Leaderboard</Card.Link>
               {ProfileArray}
            </Card.Body> 
        </>
    );
}
export default Leaderboard;
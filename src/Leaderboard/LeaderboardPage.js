import React from 'react';
import Menubar from '../MenuBar/MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import './Leaderboard.css';

/**
* Creates the main container for the leaderboard. 
* @return {LeaderboardPage}
*/
const LeaderboardPage = () => {
    const [users, setUsers] = useState([]);
    
    /**
    * Grabs all of the user data for leaderboard. 
    */
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users' } }).then((response) => {
            setUsers(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));
    }, [])

    // classes for the accordian
    var className = [
        "userPanel", 
        "userProfile", 
        "category", 
        "progressBar", 
    ];

    function sortUsers() {
        if (users !== undefined) {
            users.sort(function (a, b) {
                return b.value - a.value;
              });
              
              // sort by name
              users.sort(function(a, b) {
                const pointsA = a.category1 + a.category2 + a.category3 + a.category4 + a.category5; // ignore upper and lowercase
                const pointsB = b.category1 + b.category2 + b.category3 + b.category4 + b.category5; // ignore upper and lowercase
                if (pointsA > pointsB) {
                  return -1;
                }
                if (pointsA < pointsB) {
                  return 1;
                }
                // names must be equal
                return 0;
              });
        }
    }
    

    
    sortUsers()
    var index = 0;
    const ProfileArray = users.map((userProfile) => {
       
      index++;
      return (
            <LeaderboardProfile 
                name={userProfile.username} 
                index={index}
                className={className}
                scores={[userProfile.category1, userProfile.category2, userProfile.category3, userProfile.category4,  userProfile.category5, userProfile.category6]}
                percents={[userProfile.percentage1, userProfile.percentage2, userProfile.percentage3, userProfile.percentage4,  userProfile.percentage5, userProfile.percentage6]}/>
        );
    })

    // function ProfileArray () {
    //     var index = 0;
    //     users.forEach(userProfile => {
    //         index++;
    //         return (
    //                     <LeaderboardProfile 
    //                         name={userProfile.username} 
    //                         index={index}
    //                         user={user} 
    //                         className={className}
    //                         score={userProfile.category1 + userProfile.category2 + userProfile.category3 + userProfile.category4 + userProfile.category5}/>
    //                 );
    //     });
     //}
    
    return (
        <>
            <Menubar></Menubar>  
            <Card className="leaderboardContainer uvs-left uvs-right">    
                {ProfileArray}
            </Card>
        </>
    );
}

export default LeaderboardPage
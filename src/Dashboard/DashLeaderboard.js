import { Card } from 'react-bootstrap'
import React from 'react';
import DashLeaderboardProfiles from './DashLeaderboardProfiles';
import { useEffect, useState } from "react";
import Axios from 'axios';
import './DashLeaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
* Creates and displays the leaderboard on the main dashboard. 
* @return {Leaderboard}
*/
const Leaderboard = (props) => {
    const [users, setUsers] = useState([])
    // Fetch User Data
    useEffect(() => {
        Axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users' } }).then((response) => {
            setUsers(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));
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

    const ProfileArray = () => {
        var otherUsers = [];
        if (users !== undefined && users.length !== 0) {
            console.log("ehyp", users)
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === props.user.username) {
                    otherUsers.push(users[i - 1]);
                    otherUsers.push(users[i + 1]);
                }
            }
            console.log("whyyyyyyyyy", otherUsers)

            console.log("lastuser ", users[users.length - 1].username)
            console.log("current user", props.user.username)

            if (users[users.length - 1].username === props.user.username) {
                return ([
                    <DashLeaderboardProfiles
                        name={users[users.length - 3].username}
                        user={user}
                        index={users.length - 3}
                        className={className} />,
                    <DashLeaderboardProfiles
                        name={users[users.length - 2].username}
                        user={user}
                        index={users.length - 2}
                        className={className} />,
                    <DashLeaderboardProfiles
                        name={props.user.username}
                        user={user}
                        index={users.length - 1}
                        className={className} />
                ]);
            }
            else if (users[users.length - 1].username !== props.user.username && otherUsers[1] !== undefined) {
                return ([
                    <DashLeaderboardProfiles
                        name={otherUsers[0].username}
                        user={user}
                        index={4}
                        className={className} />,
                    <DashLeaderboardProfiles
                        name={props.user.username}
                        user={user}
                        index={5}
                        className={className} />,
                    <DashLeaderboardProfiles
                        name={otherUsers[1].username}
                        user={user}
                        index={6}
                        className={className} />
                ]);
            }
        }
    }



    return (
        <>
            <Card.Body className="LeaderboardCard uvs-right uvs-left">
                <Card.Link className="dashLeaderboardFont" href="/leaderboard" >Leaderboard</Card.Link>
                {ProfileArray()}
            </Card.Body>
        </>
    );
}
export default Leaderboard;
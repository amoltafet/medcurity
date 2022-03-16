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
    Axios.defaults.withCredentials = true;
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
        var index = 0;
        var otherUsers = [];
        if (users !== undefined && users.length !== 0) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === props.user.username) {
                    index = i;
                    otherUsers.push(users[i - 1]);
                    otherUsers.push(users[i + 1]);
                }
            }
            console.log("users", users)
            // user is in the last position
            if (users[users.length-1].username === props.user.username) {
                return ([
                    <DashLeaderboardProfiles
                        name={users[users.length - 3].username}
                        user={user}
                        index={users.length - 3}
                        className={className}
                        score={users[users.length - 3].category1 + users[users.length - 3].category2 + users[users.length - 3].category3 + users[users.length - 3].category4 + users[users.length - 3].category5} />,
                    <DashLeaderboardProfiles
                        name={users[users.length - 2].username}
                        user={user}
                        index={users.length - 2}
                        className={className} 
                        score={users[users.length - 2].category1 + users[users.length - 2].category2 + users[users.length - 2].category3 + users[users.length - 2].category4 + users[users.length - 2].category5}/>,
                    <DashLeaderboardProfiles
                        name={props.user.username}
                        user={user}
                        index={users.length - 1}
                        className={className}
                        score={users[users.length - 1].category1 + users[users.length - 1].category2 + users[users.length - 1].category3 + users[users.length - 1].category4 + users[users.length - 1].category5} />
                ]);
            }
            // user is in the first position 
            else if (users[0].username === props.user.username) {
                return ([
                    <DashLeaderboardProfiles
                        name={props.user.username}
                        user={user}
                        index={1}
                        className={className} 
                        score={props.user.category1 + props.user.category2 + props.user.category3 + props.user.category4 + props.user.category5}/>,
                    <DashLeaderboardProfiles
                        name={users[1].username}
                        user={user}
                        index={2}
                        className={className} 
                        score={users[1].category1 + users[1].category2 + users[1].category3 + users[1].category4 + users[1].category5}/>,
                    <DashLeaderboardProfiles
                        name={users[2].username}
                        user={user}
                        index={3}
                        className={className} 
                        score={users[2].category1 + users[2].category2 + users[2].category3 + users[2].category4 + users[2].category5}/>,
                ]);
            }
            else if (users[users.length - 1].username !== props.user.username && otherUsers[1] !== undefined) {
                return ([
                    <DashLeaderboardProfiles
                        name={otherUsers[0].username}
                        user={user}
                        index={index}
                        className={className} 
                        score={otherUsers[0].category1 + otherUsers[0].category2 + otherUsers[0].category3 + otherUsers[0].category4 +  otherUsers[0].category5}/>,
                    <DashLeaderboardProfiles
                        name={props.user.username}
                        user={user}
                        index={index + 1}
                        className={className} 
                        score={props.user.category1 + props.user.category2 + props.user.category3 + props.user.category4 +  props.user.category5}/>,
                    <DashLeaderboardProfiles
                        name={otherUsers[1].username}
                        user={user}
                        index={index + 2}
                        className={className} 
                        score={otherUsers[1].category1 + otherUsers[1].category2 + otherUsers[1].category3 + otherUsers[1].category4 +  otherUsers[1].category5}/>
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
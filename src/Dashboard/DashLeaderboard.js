import React from 'react';
import DashLeaderboardProfiles from './DashLeaderboardProfiles';
import { useEffect, useState } from "react";
import axios from 'axios';
import './DashLeaderboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LeaderboardProfile from '../Leaderboard/LeaderboardProfile';
import { Divider } from '@material-ui/core';
// import env from "react-dotenv";

/**
* Creates and displays the leaderboard on the main dashboard. 
* @return {Leaderboard}
*/
const Leaderboard = (props) => {
    axios.defaults.withCredentials = true;
    const [users, setUsers] = useState([])
   
    /**
    * Changed this query to just grab company data rather than global data.
    */
    useEffect(() => {
        if (props.user.type === "companyAdmin") {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
                params: {
                    the_query:
                        'SELECT Users.userid, Users.username, Users.companyid, SUM(Points) AS Points FROM CompletedModules ' +
                        'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                        'JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid WHERE AffiliatedUsers.CompanyID = ' + props.user.companyAdminID + ' ' +
                        'GROUP BY Users.userid '
                }
            }).then((response) => {
                    // // console.log("all users", response.data)
                    response.data.forEach(element => {
                        if (element.Points === null) {
                            element.Points = 0;
                        }
                    });
                    setUsers(Object.values(response.data));
                }).catch(error => console.error(`Error ${error}`));
        }
        else {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
                params: {
                    the_query:
                        'SELECT Users.userid, Users.username, Users.companyid, SUM(Points) AS Points FROM CompletedModules ' +
                        'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                        'JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid WHERE AffiliatedUsers.CompanyID = ' + props.user.companyid + ' ' +
                        'GROUP BY Users.userid '
                }
            }).then((response) => {
                    // // console.log("all users", response.data)
                    response.data.forEach(element => {
                        if (element.Points === null) {
                            element.Points = 0;
                        }
                    });
                    setUsers(Object.values(response.data));
                }).catch(error => console.error(`Error ${error}`));
        }  
    }, [])
    

  
    // for stylizing the panels
    var className = [
        "userPanel",
        "userProfile",
        "category",
        "progressBar",
    ];


    /**
    * Sorts the users by points 
    */
     function sortUsers() {
        if (users !== undefined) {
            function sorter(a, b){
                return b.Points - a.Points;
              }
              
              users.sort(sorter);
        }
    }


    sortUsers();
    const ProfileArray = () => {
        if (props.user.type === "companyAdmin") {
            // employee account
            let employeeLeaderboard = []
            if (users.length >= 1) {
                employeeLeaderboard.push(<LeaderboardProfile
                    userid={users[0].userid}
                    name={users[0].username}
                    index={0}
                    className={className}
                    score={users[0].Points} />);
            }
            if (users.length >= 2) {
                employeeLeaderboard.push(<Divider />);
                employeeLeaderboard.push(<LeaderboardProfile 
                    userid={users[1].userid}
                    name={users[1].username}
                    index={1}
                    className={className}
                    score={users[1].Points} />);
            }
            if (users.length >= 3) {
                employeeLeaderboard.push(<Divider />);
                employeeLeaderboard.push(<LeaderboardProfile 
                    userid={users[2].userid}
                    name={users[2].username}
                    index={2}
                    className={className}
                    score={users[2].Points} />);
            }
            return employeeLeaderboard;
        }
        else {
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
                // user is in the last position
                if (users[users.length-1].username === props.user.username) {
                    return ([
                        <LeaderboardProfile
                            userid={users[users.length - 3].userid}
                            name={users[users.length - 3].username}
                            index={users.length - 3}
                            className={className}
                            score={users[users.length - 3].Points} />,
                        <Divider />,
                        <LeaderboardProfile 
                            userid={users[users.length - 2].userid}
                            name={users[users.length - 2].username}
                            index={users.length - 2}
                            className={className}
                            score={users[users.length - 2].Points} />,
                        <Divider />,
                        <LeaderboardProfile
                            userid={props.user.userid}
                            name={props.user.username}
                            index={users.length - 1}
                            className={className}
                            score={users[users.length - 1].Points} />
                    ]);
                }
                // user is in the first position 
                else if (users[0].username === props.user.username) {
                    return ([
                        <LeaderboardProfile
                            userid={props.user.userid}
                            name={props.user.username}
                            index={1}
                            className={className}
                            score={users[0].Points} />,
                        <Divider />,
                        <LeaderboardProfile
                            userid={users[1].userid}
                            name={users[1].username}
                            index={2}
                            className={className}
                            score={users[1].Points} />,
                        <Divider />,
                        <LeaderboardProfile
                            userid={users[2].userid}
                            name={users[2].username}
                            index={3}
                            className={className}
                            score={users[2].Points} />,
                        <Divider />,
                    ]);
                       
                }
                else if (users[users.length - 1].username !== props.user.username && otherUsers[1] !== undefined) {
                    return ([
                        <LeaderboardProfile
                            userid={otherUsers[0].userid}
                            name={otherUsers[0].username}
                            index={index}
                            className={className} 
                            score={otherUsers[0].Points}/>,
                        <Divider />,
                            
                        <LeaderboardProfile
                            userid={props.user.userid}
                            name={props.user.username}
                            index={index + 1}
                            className={className} 
                            score={users[index].Points}/>,
                        <Divider />,
                        <LeaderboardProfile
                            userid={otherUsers[1].userid}
                            name={otherUsers[1].username}
                            index={index + 2}
                            className={className} 
                            score={otherUsers[1].Points}/>
                    ]);
                }
            }
        }
    }



    return (
        <>
                {ProfileArray()}
        </>
    );
}
export default Leaderboard;

//                <Card.Link className="dashLeaderboardFont" href="/leaderboard" >Leaderboard</Card.Link>

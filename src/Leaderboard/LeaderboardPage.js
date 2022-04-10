import React from 'react';
import Menubar from '../MenuBar/MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import { Card, Col, Row, Tab, Nav } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import './Leaderboard.css';

/**
* Creates the main container for the leaderboard. 
* @return {LeaderboardPage}
*/
const LeaderboardPage = () => {
    axios.defaults.withCredentials = true;
    const [allUsers, setAllUsers] = useState([]);
    const [companyUsers, setCompanyUsers] = useState([]);
    const [companyName, setCompanyName] = useState("Company");
    const [currentUser, setCurrentUser] = useState([]);

    /**
    * grabs current user.  
    */
    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
          setCurrentUser(response.data.user[0]) 
          console.log("userId:", response.data.user[0].companyid)
        }).catch(error => console.error(`Error ${error}`));
      }, []);
    
    /**
    * Grabs all of the user data for leaderboard. 
    */
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users' } }).then((response) => {
            setAllUsers(Object.values(response.data));
            console.log("all users", response.data)
        }).catch(error => console.error(`Error ${error}`));
    }, [])

    /**
    * Grabs company name. 
    */
     useEffect(() => {
        if (currentUser.companyid !== undefined) { 
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Companies WHERE companyid = ' + currentUser.companyid} }).then((response) => {
                setCompanyName(Object.values(response.data));
               
            }).catch(error => console.error(`Error ${error}`));
        }
    }, [currentUser])
    /**
    * Grabs all of the users in the same company as the logged in user for the leaderboard. 
    */
     useEffect(() => {
         if (currentUser.companyid !== undefined) { 
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: 'SELECT * FROM Users WHERE companyid = ' + currentUser.companyid} }).then((response) => {
                setCompanyUsers(Object.values(response.data));
                console.log("company users", response.data)
            }).catch(error => console.error(`Error ${error}`));
        }
    }, [currentUser])



    // classes for the accordian
    var className = [
        "userPanel", 
        "userProfile", 
        "category", 
        "progressBar", 
        "companiesPanel",
    ];

    /**
    * Sorts the users by points 
    */
    function sortUsers() {
        if (allUsers !== undefined) {
            allUsers.sort(function (a, b) {
                return b.value - a.value;
              });
              
              // sort by name
              allUsers.sort(function(a, b) {
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

    function sortCompanyUsers() {
        if (companyUsers !== undefined) {
            companyUsers.sort(function (a, b) {
                return b.value - a.value;
            });
              
              // sort by name
              companyUsers.sort(function(a, b) {
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
    const AllUsersProfileArray = allUsers.map((userProfile) => {
       
      index++;
      return (
            <LeaderboardProfile 
                userid={userProfile.userid} 
                name={userProfile.username} 
                index={index}
                className={className}
                userColor={className[4]}
                companyColor={className[0]}
                scores={[userProfile.category1, userProfile.category2, userProfile.category3, userProfile.category4,  userProfile.category5, userProfile.category6]}
                percents={[userProfile.percentage1, userProfile.percentage2, userProfile.percentage3, userProfile.percentage4,  userProfile.percentage5, userProfile.percentage6]}/>
        );
    })

    var company_index = 0;
    sortCompanyUsers();
    const CompanyUsersProfileArray = companyUsers.map((userProfile) => {
       
        company_index++;
        return (
              <LeaderboardProfile 
                  userid={userProfile.userid} 
                  name={userProfile.username} 
                  index={company_index}
                  className={className}
                  userColor={className[0]}
                  companyColor={className[4]}
                  scores={[userProfile.category1, userProfile.category2, userProfile.category3, userProfile.category4,  userProfile.category5, userProfile.category6]}
                  percents={[userProfile.percentage1, userProfile.percentage2, userProfile.percentage3, userProfile.percentage4,  userProfile.percentage5, userProfile.percentage6]}/>
          );
    })
     
    
    return (
        <>
            <Menubar></Menubar>  
            <div className="leaderboardbg">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="justify-content-center">
                        <Col xs={1} md={1} lg={1} className="shadowTab_leaderboard uvs-left">
                        <Nav variant="pills" className="selection_leaderbaord_container text-left">
                            <Nav.Item className="orginization_selection_tab">
                                <Nav.Link className="leaderbaord_pill_font" eventKey="first">{companyName.name} Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="all_leaderboard_selection ">
                                <Nav.Link  className="leaderbaord_pill_font" eventKey="second">Meducrity Learn Security Users</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={12} lg={7}>
                        <Tab.Content>
                            <Tab.Pane  eventKey="first">
                                <Col className="justify-content-center">
                                <Card className="leaderboardContainer  uvs-left uvs-right">    
                                   {CompanyUsersProfileArray}
                                </Card>
                                </Col>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Col className="justify-content-center">
                                <Card className="leaderboardContainer uvs-left uvs-right">    
                                    {AllUsersProfileArray}
                                </Card>
                                </Col>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
            </div>
        </>
    );
}

export default LeaderboardPage
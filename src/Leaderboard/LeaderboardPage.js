import React from 'react';
import Menubar from '../MenuBar/MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import InvalidPage from '../InvalidPage/InvalidPage';
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
    const [company, setCompany] = useState("Company");
    const [companyUsers, setCompanyUsers] = useState([]);
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
        axios.get('http://localhost:3002/api/getQuery', {
            params: {
                the_query:
                    'SELECT Users.userid, Users.username, AffiliatedUsers.CompanyID, Users.profilepicture, SUM(Points) AS Points FROM CompletedModules ' +
                    'JOIN UserPoints ON UserPoints.PointsID = CompletedModules.LearningModID ' +
                    'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                    'LEFT JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid ' +
                    'GROUP BY Users.userid'
            }
        }).then((response) => {
            console.log("all users", response.data)
            response.data.forEach(element => {
                if (element.Points === null) {
                    element.Points = 0;
                }
            });
            setAllUsers(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));
    }, [])

    /**
   * Grabs company users. 
   */
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', {
            params: {
                the_query:
                    'SELECT Users.userid, Users.username, Users.companyid, Users.profilepicture, SUM(Points) AS Points FROM CompletedModules ' +
                    'JOIN UserPoints ON UserPoints.PointsID = CompletedModules.LearningModID ' +
                    'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                    'JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid WHERE AffiliatedUsers.CompanyID = ' + currentUser.companyid + ' ' +
                    'GROUP BY Users.userid '
            }
        }).then((response) => {
            response.data.forEach(element => {
                if (element.Points === null) {
                    element.Points = 0;
                }
            });
            setCompanyUsers(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));
    }, [currentUser])

    /**
    * Grabs company name. 
    */
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', {
            params: {
                the_query:
                    'SELECT * FROM Companies WHERE companyid = ' + currentUser.companyid
            }
        }).then((response) => {
            setCompany(Object.values(response.data[0].name))
        }).catch(error => console.error(`Error ${error}`));



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
            function sorter(a, b) {
                return b.Points - a.Points;
            }

            allUsers.sort(sorter);
        }
    }

    /**
    * Sorts the company users by points 
    */
    function sortCompanyUsers() {
        if (companyUsers !== undefined) {
            function sorter(a, b) {
                return b.Points - a.Points;
            }
            companyUsers.sort(sorter);
        }
    }

    /**
    * Maps each user out to their leaderboard profile. 
    */
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
                score={userProfile.Points} />
        );
    })

    /**
    * Sorts the users by points 
    */
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
                score={userProfile.Points} />
        );
    })

    if (currentUser?.userid) {
        return (
            <>
                <Menubar></Menubar>
                <div className="leaderboardbg">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="justify-content-center">
                            <Col xs={1} md={1} lg={1} className="shadowTab_leaderboard uvs-left">
                                <Nav variant="pills" className="selection_leaderbaord_container text-left">
                                    <Nav.Item className="orginization_selection_tab">
                                        <Nav.Link className="leaderbaord_pill_font" eventKey="first">{company} Users</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="all_leaderboard_selection ">
                                        <Nav.Link className="leaderbaord_pill_font" eventKey="second">All Users</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={12} md={12} lg={7}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
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
    else {
        return (
            <>
                <InvalidPage
                    redirectPage={'/'}
                    reason={"You need to be logged in to view the leaderboard."}
                    btnMessage={"Back to Login Page"}>
                </InvalidPage>
            </>
        )
    }
}

export default LeaderboardPage
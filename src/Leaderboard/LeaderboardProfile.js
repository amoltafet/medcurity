import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import './LeaderboardProfile.css'
// import env from "react-dotenv";

/**
* Creates and displays each users leaderboard profile. 
* @param {Array} className the css style to display. 
* @param {user} user the user grabed from the dashboard.
* @return {GetPage}
*/
function LeaderboardProfile (props) {
    const [directories, setDirectories] = useState([]);
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [profilePic, setProfilePic] = useState("")

   /**
    * grabs current user.  
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0]); 
        }).catch(error => console.error(`Error ${error}`));
      }, []);
    /**
    * Creates and displays each users leaderboard profile. 
    * @param {Array} className the css style to display. 
    * @param {user} user the user grabed from the dashboard.
    * @return {GetPage}
    */

   /**
    * grabs users assigned modules info.  
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: 
        // `SELECT * ` +
        // `FROM AffiliatedUsers JOIN CompanyLearningModules ` +
        // `ON AffiliatedUsers.CompanyID = CompanyLearningModules.CompanyID ` +
        // `JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ` +
        // `JOIN UserPoints ON UserPoints.PointsID = CompanyLearningModules.LearningModID ` +
        // `RIGHT JOIN CompletedModules ON UserPoints.PointsID = CompletedModules.LearningModID ` +
        // `WHERE AffiliatedUsers.UserID = '${currentUser.userid}'`
        `SELECT * ` +
        `FROM AffiliatedUsers  ` +
        `JOIN CompletedModules ON AffiliatedUsers.UserID = CompletedModules.UserID ` +
        `JOIN LearningModules ON LearningModules.ID = CompletedModules.LearningModID ` +
        `WHERE AffiliatedUsers.UserID = '${currentUser.userid}'` 
        } }).then((response) => {
            setDirectories(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));  
    }, [currentUser])

    useEffect(() => { 
        if (props.userid) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: props.userid }} ).then((response) => { 
                setProfilePic(response.data.profileImage) 
            }); 
        }
    }, [])

    const GetCurrentModule = () => {
        var categoryData = []
        if (directories !== null) {
        for (var i = 0; i < directories.length; i++) {
            categoryData.push( <>
                        <Col>
                            <Card.Text className={props.className[2]}><b>{directories[i].Title}</b></Card.Text>
                            <CircularProgressbar
                                className={props.className[3]}
                                value={directories[i].Percentage * 100}
                                text={`${Math.round(((directories[i].Percentage * 100) + Number.EPSILON) * 100) / 100}%`}
                                styles={{
                                    path: {
                                        stroke: "#cc3333",
                                    },
                                    trail: {
                                        stroke: "#d8dae3",
                                    },
                                    text: {
                                        fill: "white",
                                        textAnchor: "middle",
                                    }}}/>   
                            <Card.Text className="score_accordian_text">Score: {directories[i].Points}</Card.Text>
                        </Col> 
                    </>)
        } 
        return (categoryData)
        }
    }


    if (props.name === currentUser.username) {
        return (
            <>
                <Card className={`uvs-left uvs-right justify-content-center ${props.userColor}`} style={{ flexDirection: 'row' }}>
                    <Accordion className="displayLeaderboardInfo" defaultActiveKey="0">
                        <Accordion.Toggle eventKey="1" className="accordianToggel">
                            <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                                <Row className="userRow text-center">
                                    <Col xs={2} md={2} lg={2}>
                                        <div className="leaderboardRank">{props.index}.</div>
                                    </Col>
                                    <Col xs={2} md={2} lg={2}>
                                        <Image className={props.className[1]} src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <Card.Text className="userNameTitle"><u>{props.name}</u></Card.Text>
                                    </Col>
                                    <Col xs={4} md={5} lg={4}>
                                        <div className="userPointsLeaderboard"><b>Total Points:</b> {props.score}</div>
                                    </Col>
                                </Row>
                            </Card>

                        </Accordion.Toggle>
                        <Accordion.Collapse className="accordianCollapse" eventKey="1">
                            <Row xs={3} md={3} lg={6} className="categorgiesLeaderboardRow">
                                <Image className="leaderboardBreak" src="/line.png" alt=""></Image>
                                {GetCurrentModule()}
                            </Row>

                        </Accordion.Collapse>
                    </Accordion>
                </Card>
            </>
        );
    }
    else {
        return (
            <>
        <Card className={`uvs-left uvs-right justify-content-center ${props.companyColor}`} style={{ flexDirection: 'row' }}>
        <Accordion className="displayLeaderboardInfo" defaultActiveKey="0">
        <Accordion.Toggle eventKey="1" className="accordianToggel">
        <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                <Row className="userRow text-center">
                    <Col xs={2} md={2} lg={2}>
                        <div className="leaderboardRank">{props.index}.</div>
                    </Col>
                    <Col xs={2} md={2} lg={2}>
                        <Image className={props.className[1]} src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
                    </Col>
                    <Col xs={4} md={3} lg={3}>
                        <Card.Text className="userNameTitle"><u>{props.name}</u></Card.Text>
                    </Col>
                    <Col xs={4} md={5} lg={4}>
                        <div className="userPointsLeaderboard"><b>Total Points:</b>  {props.score} </div>
                    </Col>
                </Row>
            </Card>
           

</Accordion.Toggle> 
</Accordion>
</Card>

            </>
        );
    }
}

export default LeaderboardProfile;
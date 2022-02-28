import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import './LeaderboardProfile.css'


/**
* Creates and displays each users leaderboard profile. 
* @param {Array} className the css style to display. 
* @param {user} user the user grabed from the dashboard.
* @return {GetPage}
*/
function LeaderboardProfile(props) {
    const [directories, setDirectories] = useState([]);
    axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
      }, []);

    console.log(session)

    // Query for getting LearningDirectories Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT * FROM LearningModulesDirectory" } }).then((response) => {
            setDirectories(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [])

    const GetCurrentModule = () => {
        var categoryData = []
        if (directories != null) {
        for (var i = 0; i < directories.length; i++) {
            console.log(directories[0])
            categoryData.push( <>
                <Row>
                    <Col >
                    <Card.Text className={props.className[2]}>{directories[i].Title}</Card.Text>
                    <CircularProgressbar
                        className={props.className[3]}
                        value={props.user.category1TotalPoints}
                        text={`${props.user.category1TotalPoints}%`}
                        styles={{
                            path: {
                                stroke: "#1e5b88",
                            },
                            trail: {
                                stroke: "#d8dae3",
                            },
                            text: {
                                fill: "white",
                                textAnchor: "middle",
                            }
                        }} />
                        </Col>
                        <Col>
                    <Card.Text className={props.className[2]}>Score</Card.Text>
                    <Card.Text className={props.className[2]}> 0</Card.Text>
                    </Col>
                </Row> 
               
            </>)
           
        } 
        return (categoryData)
        }
    }


    if (props.name === session.username) {
        return (
            <>
                <Card className={`uvs-left uvs-right ${props.className[0]}`} style={{ flexDirection: 'row' }}>
                    <Accordion className="displayLeaderboardInfo" defaultActiveKey="0">
                        <Accordion.Toggle eventKey="1" className="accordianToggel">
                            <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                                <Col sm>
                                    <div className="leaderboardRank">{props.index}.</div>
                                </Col>
                                <Col>
                                    <Image className={props.className[1]} src="/user.png" alt="" roundedCircle />
                                </Col>
                                <Col sm>
                                    <Card.Text className="userNameTitle">{props.name}</Card.Text>
                                </Col>
                                <Col sm>
                                    <div className="scoreLabelLeaderboard" >Total Score</div>
                                </Col>
                                <Col>
                                    <div className="userPointsLeaderboard">{props.user.overallPoints}</div>
                                </Col>

                            </Card>

                        </Accordion.Toggle>
                        <Accordion.Collapse className="accordianCollapse" eventKey="1">

                            <Row className="categorgiesLeaderboardRow">
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
                <Card className={`uvs-left uvs-right ${props.className[0]}`} style={{ flexDirection: 'row' }}>
                    <Accordion className="displayLeaderboardInfo" defaultActiveKey="0">
                        <Accordion.Toggle eventKey="1" className="accordianToggel">
                            <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                                <Col sm>
                                    <div className="leaderboardRank">{props.index}.</div>
                                </Col>
                                <Col>
                                    <Image className={props.className[1]} src="/user.png" alt="" roundedCircle />
                                </Col>
                                <Col sm>
                                    <Card.Text className="userNameTitle">{props.name}</Card.Text>
                                </Col>
                                <Col sm>
                                    <div className="scoreLabelLeaderboard" >Total Score</div>
                                </Col>
                                <Col>
                                    <div className="userPointsLeaderboard">{props.user.overallPoints}</div>
                                </Col>

                            </Card>

                        </Accordion.Toggle>
                    </Accordion>
                </Card>
            </>
        );
    }
}

export default LeaderboardProfile;
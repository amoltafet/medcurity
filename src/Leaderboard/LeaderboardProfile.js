import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import './LeaderboardProfile.css'


/**
* Creates and displays each users leaderboard profile. 
* @param {Array} className the css style to display. 
* @param {user} user the user grabed from the dashboard.
* @return {GetPage}
*/
function LeaderboardProfile(props) {
    return (
        <>
       
            <Accordion className="userPanel" defaultActiveKey="0">
                <Accordion.Toggle eventKey="1" className="accordianToggel">
                <Card className="cardHeaderAccordian" style={{ flexDirection: 'row' }}>
                    <Row>
                        <Card.Text className="userNameTitle">{props.name}</Card.Text>
                        <Image className={props.className[1]} src="/user.png" alt="" roundedCircle />
                    </Row>    
                    <Row>
                            <Card.Text className={props.className[2]}>Category 1</Card.Text>
                        
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
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 2</Card.Text>
                 
                        <CircularProgressbar
                            className={props.className[3]}
                            value={props.user.category2TotalPoints}
                            text={`${props.user.category2TotalPoints}%`}
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
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 3</Card.Text>
       
                        <CircularProgressbar
                            className={props.className[3]}
                            value={props.user.category3TotalPoints}
                            text={`${props.user.category3TotalPoints}%`}
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
                    </Row>
                    <Row>
                            <Card.Text className={props.className[2]}>Category 4</Card.Text>
                   
                        <CircularProgressbar
                            className={props.className[3]}
                            value={props.user.category4TotalPoints}
                            text={`${props.user.category4TotalPoints}%`}
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
                    </Row>
                    <Row>
                        
                            <Card.Text className={props.className[2]}>Category 5</Card.Text>
                       
                        <CircularProgressbar
                            className={props.className[3]}
                            value={props.user.category5TotalPoints}
                            text={`${props.user.category5TotalPoints}%`}
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
                    </Row>

                </Card>
            
                </Accordion.Toggle>
                <Accordion.Collapse className="accordianCollapse" eventKey="1">
                   <Card.Body>
                        <Row>
                            <Card.Body>Hello</Card.Body>
                        </Row>
                   </Card.Body>
                </Accordion.Collapse>
            </Accordion>
     
        </>
    );
}

export default LeaderboardProfile;
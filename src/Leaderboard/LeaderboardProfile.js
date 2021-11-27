import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import './LeaderboardProfile.css'

function LeaderboardProfile(props) {
    console.log(props.className);
    return (
        <>
            <Accordion> 
                        <Card className={props.className[0]} style={{ flexDirection: 'row' }}>
                        <Image className={props.className[1]} src="/user.png" alt="" roundedCircle />
                        <Row>
                            <Card.Body>
                                <Card.Text className={props.className[2]}>Category 1</Card.Text>
                            </Card.Body>
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
                            <Card.Body>
                                <Card.Text className={props.className[2]}>Category 2</Card.Text>
                            </Card.Body>
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
                            <Card.Body>
                                <Card.Text className={props.className[2]}>Category 3</Card.Text>
                            </Card.Body>
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
                            <Card.Body>
                                <Card.Text className={props.className[2]}>Category 4</Card.Text>
                            </Card.Body>
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
                            <Card.Body>
                                <Card.Text className={props.className[2]}>Category 5</Card.Text>
                            </Card.Body>
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
                  
            </Accordion>

        </>
    );
}

export default LeaderboardProfile;
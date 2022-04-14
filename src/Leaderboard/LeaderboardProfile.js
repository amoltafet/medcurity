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
    const [currentUser, setCurrentUser] = useState([]);
    const [profilePic, setProfilePic] = useState("")
    const totalScore = props.scores[0] + props.scores[1] + props.scores[2] + props.scores[3] + props.scores[4] + props.scores[5]; 

    //console.log(props.userid)

    useEffect(() => {
        setCurrentUser(props.currentUser);
    },[])

  
    /**
    * Creates and displays each users leaderboard profile. 
    * @param {Array} className the css style to display. 
    * @param {user} user the user grabed from the dashboard.
    * @return {GetPage}
    */
    // Query for getting LearningDirectories Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
        { params: { userid: currentUser.userid }
        }).then((response) => {
            setDirectories(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [currentUser])


    useEffect(() => {
        axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
        { params: { userid: currentUser.userid }
        }).then((response) => {
            setDirectories(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [currentUser])

    useEffect(() => { if (props.userid) axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: props.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

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
                                        <div className="userPointsLeaderboard"><b>Total Points:</b>  {totalScore}</div>
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
                        <div className="userPointsLeaderboard"><b>Total Points:</b>  {totalScore}</div>
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
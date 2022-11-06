import { Nav, Row, Form, Tab, Col, Container, Button, Popover, OverlayTrigger, Image } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import './Badges.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import env from "react-dotenv";

/**
* Creates and displays the badges that user has and has not earned as a component.
* @return {Badges}
*/
const Badges = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [badges, setBadges] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0]);
        }).catch(error => console.error(`Error ${error}`));
        setLoaded(true)
    }, []);

    useEffect(() => {
            // function used to pull in badges and their icons
            async function getBadges() {
                // let badge_query = `SELECT * FROM Badges LEFT JOIN (SELECT * FROM earnedBadges WHERE userID = ${currentUser.userid}) AS earnedBadges ON badges.id = earnedBadges.badgeID`
                let badge_query = `SELECT * FROM Badges`
                // let badgesListA = (await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                //    { params: { the_query: badge_query }}).catch(error => console.error(`Error ${error}`))).data;
                // console.log(badgesListA)
                
                let badgesList = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                    { params: { the_query: badge_query}}).catch(error => console.error(`Error ${error}`));
                badgesList = badgesList.data;
                
                for (let i = 0; i < badgesList.length; i++) {
                    let badge = badgesList[i];
                    let badgeImage = (await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getBadgeImage`, { params: { id: badge.id }})
                        .catch(error => console.error(`Error ${error}`))).data.badgeImage;
                    badgesList[i].image = badgeImage

                    let userBadgeQuery = `SELECT * FROM earnedBadges WHERE userID = ${currentUser.userid} AND badgeID = ${badge.id}`;
                    let userBadge = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                    { params: { the_query: userBadgeQuery}}).catch(error => console.error(`Error ${error}`));
                    userBadge = userBadge.data;
                    
                    console.log(userBadge);
                    if (userBadge.length === 0) {
                        badgesList[i].earned = false;
                    }
                    else {
                        badgesList[i].earned = true;
                    }
                }

                setBadges(badgesList);
            }
        
        getBadges();
    },[currentUser, isLoaded]);

    return (
        /*
        <>
            <Tab.Container className="justify-content-center" defaultActiveKey="first" style={{ display: 'flex' }}>
                <Col className="settingsRow uvs-left uvs-right">
                    <Row className="dropShadow justify-content-center">
                        <Nav variant="pills selectionBox" className="selectionBox justify-content-center">
                            <Nav.Item className="justify-content-center settingSpacing">
                                <Nav.Link className=' justify-content-center selectedSetting' eventKey="first">Profile Settings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="justify-content-center settingSpacing">
                                <Nav.Link className=' unselectedSetting justify-content-center' eventKey="second">Company Info</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row className="dropShadow justify-content-center">
                        <Container className="settingsContentPaneContainer">
                        <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Form>
                                <Form.Group className="justify-content-center">
                                    <Image className="settingsProfilePicture" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle></Image>
                                <Form.File 
                                    className="userProfilePhotoInput"
                                    onChange={(e) => uploadUserPhoto((e.target.files[0]))}
                                    accept=".png,.jpg,.jpeg"/>
                                </Form.Group>
                                <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                        <Form.Text className="emailText">Email</Form.Text>
                                        <Form.Control disabled defaultValue={currentUser.email}></Form.Control>
                                </Form.Group>
                                <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                    <Form.Text className="usernameText">Username</Form.Text>
                                    <Form.Control
                                        defaultValue={currentUser.username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}>
                                    </Form.Control>
                                </Form.Group>
                                <h3>Change Password</h3>
                                <Form.Group className="passwordInput" controlId="formPlaintextEmail">
                                    <Form.Text className="passwordText" id="newPasswordText">New Password</Form.Text>
                                    <Form.Control
                                        type="password"
                                        value = {newPassword}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="passwordInput" controlId="formPlaintextEmail">
                                    <Form.Text className="passwordText" id="repeatPasswordText">Retype Password</Form.Text>
                                    <Form.Control
                                        type="password"
                                        value = {repeatPassword}
                                        onChange={(e) => {
                                            setRepeatPassword(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                            </Form>
                               <OverlayTrigger delay={{ show: 5000, hide: 4000 }} show={show} placement="bottom" overlay={popover}>
                                        <Button
                                            className="settingsWideButton"
                                            onClick={() => SaveUpdatedUserInfo()}>
                                            Save
                                        </Button>
                                    </OverlayTrigger>
                                        <Button
                                            className="settingsWideButton"
                                            onClick={NavToDash}>
                                            Back to Dashboard
                                        </Button>
                                   
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Form>
                                    <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                        <Form.Text className="usernameText">Company</Form.Text>
                                        <Form.Control disabled defaultValue={company}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                            <Form.Text className="emailText">Date Joined</Form.Text>
                                            <Form.Control disabled defaultValue={dueDate}></Form.Control>
                                    </Form.Group>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Container>
                    </Row>
                </Col>
            </Tab.Container>
        </>
        */
       <>
            <div>{currentUser.userid}</div>
            <div>
                    {badges.map(badge => {
                        // setting class depending on if user has earned the badge or not
                        let className = "";
                        if (badge.earned) {
                            className = "earned";
                        } else {
                            className = "unearned";
                        }

                        // each badge leads to this output
                        return (<li key={badge.id}>
                            {badge.name}, {badge.id}, {badge.icon}, {badge.earned} <br></br>
                            <Image className={className} src={`data:image/png;base64,${badge.image}`} alt="Badge Icon"></Image>
                        </li>    
                    )})}
            </div>
       </>
    );
}

export default Badges;
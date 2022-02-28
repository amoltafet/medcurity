import { Nav, Row, Form, Tab, Col, Container, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import './SettingsMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
* Creates and displays the Settings menu allows the user to toggle between diffrent settings. 
* @return {GetPage}
*/
const SettingsMenu = () => {
    axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
    const [newEmail, setEmail] = useState("");
    const [newUserName, setUsername] = useState("");
    const [saveData, setSaveData] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
            console.log('aaahhh', response.data.user)
            setSession(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    useEffect(() => {
        if (saveData === true) {
            axios.put("http://localhost:3002/users/settings", { params: { username: newUserName, id: session.userid } }).then((response) => {
                setSession(response);
            })
            .catch(error => console.log(`Error ${error}`));
        } 
   }, [saveData])

    function SaveUpdatedUserInfo () {
      setSaveData(true);
    }

    console.log(session)

    return (
        <>
            <Tab.Container className="settingsRow" id="left-tabs-example" defaultActiveKey="first" style={{ display: 'flex' }}>
                <Row className="settingsRow">
                    <Col className=" shadowTab justify-content-center uvs-left uvs-right" sm={2}>

                        <Nav variant="pills" className="flex-column marginTop">
                            <Nav.Item className="selectedSetting ">
                                <Nav.Link eventKey="first">User Profile Settings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="unselectedSetting">
                                <Nav.Link eventKey="second">Organization Information</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col className="dropShadow justify-content-center uvs-left uvs-right" sm={8}>
                        <Container className="settingsContentPaneContainer">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form >
                                        <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                            <Form.Text className="usernameText">UserName</Form.Text>
                                            <Form.Control
                                                defaultValue={session.username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                            <Form.Text className="emailText">Email</Form.Text>
                                            <Form.Control disabled defaultValue={session.email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}></Form.Control>
                                        </Form.Group>
                                    </Form>
                                    <Button 
                                        className="settingsSaveButton"
                                        onClick={() => SaveUpdatedUserInfo()}>
                                        Save
                                    </Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                </Tab.Pane>
                            </Tab.Content>
                        </Container>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}
export default SettingsMenu;


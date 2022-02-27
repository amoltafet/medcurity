import { Nav, Image, Row, Form, Tab, Col, Container } from 'react-bootstrap';
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

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
            console.log('aaahhh', response.data.user)
            setSession(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
    }, []);


    function ChangeUserName (newUserName) {
        useEffect(() => {
            if (newUserName !== session.username) {
                
            }
        }, [])

    }
    
    function ChangeEmail (newEmail) {
        useEffect(() => {
            if (newEmail !== session.email) {
                
            }
        }, [])

    }

    console.log(session)

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{ display: 'flex' }}>
                <Row className="settingsRow">
                    <Col className="shadowTab uvs-left uvs-right" sm={2}>

                        <Nav variant="pills" className="flex-column marginTop">
                            <Nav.Item className="selectedSetting">
                                <Nav.Link eventKey="first"><Image className="profileImage" variant="top" src="/user.png" alt="" roundedCircle></Image></Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item className="unselectedSetting">
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item> */}
                        </Nav>
                    </Col>

                    <Col className="dropShadow uvs-left uvs-right" sm={8}>
                        <Container className="settingsMenuContainer">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form >
                                        <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                            <Form.Text className="usernameText">UserName</Form.Text>
                                            <Form.Control
                                                defaultValue={session.username}
                                                onChange={(e) => {
                                                    ChangeUserName(e.target.value);
                                                }}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                            <Form.Text className="emailText">Email</Form.Text>
                                            <Form.Control
                                                defaultValue={session.email}
                                                onChange={(e) => {
                                                    ChangeEmail(e.target.value);
                                                }}></Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Tab.Pane>

                                {/* <Tab.Pane eventKey="second">

                            </Tab.Pane> */}
                            </Tab.Content></Container>
                    </Col>
                </Row>
            </Tab.Container>


        </>
    );
}
export default SettingsMenu;


import { Nav, Image, Row, Form, Tab, Col, Container } from 'react-bootstrap'
import React from 'react';
import './SettingsMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
* Creates and displays the Settings menu allows the user to toggle between diffrent settings. 
* @return {GetPage}
*/
const SettingsMenu = () => {
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{display: 'flex'}}>
                <Row className="settingsRow">
                    <Col className="shadowTab" sm={2}>
                   
                        <Nav variant="pills" className="flex-column marginTop ">
                            <Nav.Item className="selectedSetting">
                                <Nav.Link eventKey="first"><Image className="profileImage " variant="top" src="/user.png" alt="" roundedCircle></Image></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="unselectedSetting">
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    
                    <Col className="dropShadow" sm={8}>
                    <Container className="settingsMenuContainer">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                               
                                    <Form >
                                        <Form.Group className="usernameInput" controlId="exampleForm.ControlTextarea1">
                                            <Form.Text className="usernameText">UserName</Form.Text>
                                            <Form.Control placeholder="username"></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="emailInput" controlId="exampleForm.ControlTextarea1">
                                            <Form.Text className="emailText">Email</Form.Text>
                                            <Form.Control placeholder="email"></Form.Control>
                                        </Form.Group>
                                    </Form>
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="second">

                            </Tab.Pane>
                        </Tab.Content></Container>
                    </Col>
                </Row>
            </Tab.Container>


        </>
    );
}
export default SettingsMenu;


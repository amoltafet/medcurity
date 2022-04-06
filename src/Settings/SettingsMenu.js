import { Nav, Row, Form, Tab, Col, Container, Button, Popover, OverlayTrigger, Image } from 'react-bootstrap';
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
    const [newUserName, setUsername] = useState("");
    const [saveData, setSaveData] = useState(false);
    const [show, setShow] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [company, setCompany] = useState([]);
    const [dueDate, setDueDate] = useState([]);
    const [convertedProfilePhoto, setConvertedProfilePicture] = useState("/user.png");
    const [profilePic, setProfilePic] = useState("")

    useEffect(() => { if (session.userid) axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: session.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
            setSession(response.data.user[0]);
        }).catch(error => console.error(`Error ${error}`));
        setLoaded(true)
    }, []);

    useEffect(() => {
        if (isLoaded) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT * FROM Companies WHERE companyid = ' + session.companyid} 
            }).then((response) => {
                console.log(session)
                if (session.profilepicture !== null && session.profilepicture.data !== null) {
                    try {     
                        console.log("grabbed image: ", session.profilepicture.data)
                        var photo = URL.createObjectURL(session.profilepicture);  
                        console.log("converted image: ",photo )
                          setConvertedProfilePicture(photo);
                        
                    } catch (error) {
                        console.log(error)
                    }
                  
                }
                if (response.data[0].datejoined !== null) { 
                    setCompany(response.data[0]);
                    var date = new Date(response.data[0].datejoined);
                    setDueDate(date.toDateString()); 
                
                }
            }).catch(error => console.error(`Error ${error}`));
        }
    },[session, dueDate, isLoaded])

 

    useEffect(() => {
        if (saveData === true) 
        {
            if (newUserName !== "") {
                axios.post("http://localhost:3002/users/changeUserName", {
                    username: newUserName,
                    id: session.userid
                }).then((response) => {
                    console.log("response", response.data);
                    
                }).catch(error => console.log(`Error ${error}`));
            }

            setSaveData(false);
            setShow(true);
        }
       
    }, [saveData, newUserName, session.userid])

    setTimeout(() =>{
        setShow(false)
    }, 9000)

   

    function uploadUserPhoto (userPhoto) {
        /*console.log("unconverted photo", userPhoto)
        var convertedPhoto = URL.createObjectURL(userPhoto);
        console.log("convertedPhoto: ", convertedPhoto)
        setConvertedProfilePicture(convertedPhoto);*/

        //TODO ... THEN call API method to store the image from (banner)
        var data = new FormData();
        data.append("profileImage", userPhoto);
        axios.post("http://localhost:3002/api/postProfilePicture", data, { params: { userid: session.userid } , headers: { 'Content-Type': 'multipart/form-data' } })

    }
  
    
    function SaveUpdatedUserInfo() {
        setSaveData(true);
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Saved!</Popover.Title>
        </Popover>
    );


    return (
        <>
            <Tab.Container className="settingsRow justify-content-center" id="left-tabs-example" defaultActiveKey="first" style={{ display: 'flex' }}>
                <Row className="settingsRow">
                    <Col className=" shadowTab  uvs-left uvs-right" sm={2}>
                        <Nav variant="pills" className="flex-column marginTop">
                            <Nav.Item className=" justify-content-center">
                                <Nav.Link className='justify-content-center selectedSetting' eventKey="first">User Profile Settings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="justify-content-center">
                                <Nav.Link className='unselectedSetting justify-content-center' eventKey="second">Organization Information</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col className="dropShadow justify-content-center uvs-left uvs-right" sm={8}>
                        <Container className="settingsContentPaneContainer">
                        <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Form>
                                <Form.Group>
                                    <Image className="dash_profilePicture" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle></Image>
                                <Form.File 
                                    className="userProfilePhotoInput"
                                    onChange={(e) => uploadUserPhoto((e.target.files[0]))}
                                    accept=".png,.jpg,.jpeg"/>
                                </Form.Group>
                                <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                        <Form.Text className="emailText">Email</Form.Text>
                                        <Form.Control disabled defaultValue={session.email}></Form.Control>
                                </Form.Group>
                                <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                    <Form.Text className="usernameText">UserName</Form.Text>
                                    <Form.Control
                                        defaultValue={session.username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                        <Form.Text className="emailText">Change Password</Form.Text>
                                        <Form.Control></Form.Control>
                                </Form.Group>
                            </Form>
                               <OverlayTrigger delay={{ show: 5000, hide: 4000 }} show={show} placement="bottom" overlay={popover}>
                                            <Button
                                                className="settingsSaveButton"
                                                onClick={() => SaveUpdatedUserInfo()}>
                                                Save
                                            </Button>
                                        </OverlayTrigger>
                                   
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Form>
                                    <Form.Group className="usernameInput" controlId="formPlaintextEmail">
                                        <Form.Text className="usernameText">Company</Form.Text>
                                        <Form.Control disabled defaultValue={company.name}></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="emailInput" controlId="formPlaintextEmail">
                                            <Form.Text className="emailText">Date Joined</Form.Text>
                                            <Form.Control disabled defaultValue={dueDate}></Form.Control>
                                    </Form.Group>
                                    </Form>
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


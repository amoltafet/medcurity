/*
File Name: SettingsMenu.js
Description: This file contains the profile page for a user. Users 
  can view their personal info, badges, and their high scores. 
Last Modified: February 14, 2023
*/

import {Nav, Form, Tab, Container, Button, Popover, OverlayTrigger, Image} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Badges from '../Badges/Badges';
import HighScores from '../HighScores/HighScores';
import './SettingsMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Creates and displays the Profile Page for a user.
 * @return {Page}
 */
const SettingsMenu = () => {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState([]);
  const [newUserName, setUsername] = useState('');
  const [saveData, setSaveData] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [company, setCompany] = useState([]);
  const [companyID, setCompanyID] = useState(null);
  const [newPassword, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [message, setMessage] = useState('Saved!');
  const navigate = useNavigate();

  // pulling in profile picture from server
  useEffect(() => {
    if (currentUser.userid)
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, {
          params: { id: currentUser.userid }
        })
        .then(response => {
          setProfilePic(response.data.profileImage)
        })
  }, [currentUser, profilePic]);

  // logging user in
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then(response => {
        setCurrentUser(response.data.user[0]);
        setLoaded(true);

    }).catch(error => console.error(`Error ${error}`));
  }, []);

  // setting company information 
  useEffect(() => {
    if (currentUser.userid) {
      if (currentUser.type === "user" || currentUser.type === "websiteAdmin") {
        setCompanyID(currentUser.companyid);
      }
      else if (currentUser.type === "companyAdmin") {
        setCompanyID(currentUser.companyAdminID);
      }
    }
  }, [currentUser]);

    // setting company information 
    useEffect(() => {
      if (companyID) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
          params: {the_query: `SELECT name FROM companies WHERE companyid = ${companyID}`}
        })
        .then(response => {
          setCompany(response.data[0].name);
        })
        .catch(error => console.error(`Error ${error}`));
      }
    }, [companyID]);

  // changing user name
  useEffect(() => {
    if (saveData === true) {
      if (newUserName !== '') {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/users/changeUserName`, {
            username: newUserName,
            id: currentUser.userid
          })
          .then(response => {
            // console.log("response", response.data);
          })
          .catch()
      }
      if (newPassword !== '') {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/users/changeUserPassword`, {
            userid: currentUser.userid,
            newPassword: newPassword,
            retypedPassword: repeatPassword
          })
          .then(response => {
            // console.log("response", response.data);
            setMessage(response.data['message'])
            // console.log("Message:", message)
          })
          .catch()
      }

      setSaveData(false)
      setPassword('')
      setRepeatPassword('')
      setShow(true)
      window.location.reload()
    }
  }, [saveData, newUserName, currentUser.userid, newPassword, repeatPassword]);

  setTimeout(() => {
    setShow(false);
  }, 9000);

  // function for uploading profile picture
  function uploadUserPhoto (userPhoto) {
    // console.log("unconverted photo", userPhoto);
    // var convertedPhoto = URL.createObjectURL(userPhoto);
    // console.log("convertedPhoto: ", convertedPhoto)
    // setConvertedProfilePicture(convertedPhoto);

    var data = new FormData()
    data.append('profileImage', userPhoto)
    axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/postProfilePicture`,
      data,
      {
        params: { userid: currentUser.userid },
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    setProfilePic(userPhoto);
  }

  function SaveUpdatedUserInfo () {
    setSaveData(true)
  }

  const NavToDash = () => {
    navigate('/dash');
  }

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>{message}</Popover.Title>
    </Popover>
  )

  return (
    <>
      <Tab.Container
        className='justify-content-center'
        defaultActiveKey='profile'
        style={{ display: 'flex'}}
      >
        <Container className='settingsContentPaneContainer'>
          <Form>
            <div class='container emp-profile'>
              <form method='post'>
                <div class='row'>
                  <div class='col-md-4'>
                    <div class='profile-img'>
                      <Form.Group className='justify-content-center'>
                        <Image
                          className='settingsProfilePicture uvs-left'
                          variant='top'
                          src={`data:image/png;base64,${profilePic}`}
                          alt=''
                          roundedCircle
                        ></Image>
                      </Form.Group>
                    </div>
                  </div>
                  <div class='col-md-6'>
                    <div class='profile-head'>
                      <h5>{currentUser.username}</h5>
                      <ul class='nav nav-tabs' id='myTab' role='tablist'>
                        <Nav className='justify-content-center'>
                          <li class='nav-item'>
                            <Nav.Item className='justify-content-center settingSpacing'>
                              <Nav.Link
                                eventKey='profile'
                                class='nav-link active'
                                id='home-tab'
                                data-toggle='tab'
                                role='tab'
                                aria-controls='home'
                                aria-selected='true'
                              >
                                Profile
                              </Nav.Link>
                            </Nav.Item>
                          </li>
                          <li class='nav-item'>
                          <Nav.Item className='justify-content-center settingSpacing'>
                              <Nav.Link
                                class='nav-link'
                                id='profile-tab'
                                data-toggle='tab'
                                role='tab'
                                aria-controls='profile'
                                aria-selected='false'
                                eventKey='badges'
                              >
                                Badges
                              </Nav.Link>
                            </Nav.Item>
                          </li>
                          <li class='nav-item'>
                          <Nav.Item className='justify-content-center settingSpacing'>
                              <Nav.Link
                                class='nav-link'
                                id='profile-tab'
                                data-toggle='tab'
                                role='tab'
                                aria-controls='profile'
                                aria-selected='false'
                                eventKey='highscores'
                              >
                                High Scores
                              </Nav.Link>
                            </Nav.Item>
                          </li>
                        </Nav>
                      </ul>
                    </div>
                  </div>
                  <div class='col-md-2'>
                    <Nav className='justify-content-center'>
                      <Nav.Item className='justify-content-center settingSpacing'>
                        <Nav.Link
                          eventKey='edit'
                          type='submit'
                          class='profile-edit-btn'
                          name='btnAddMore'
                          value='Edit Profile'
                        >
                          <img
                            class='edit-icon'
                            src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png'
                            alt=''
                          />
                          Edit Profile
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-md-4'>
                    <div>
                    </div>
                  </div>
                  <div class='col-md-8'>
                    <div class='tab-content profile-tab' id='myTabContent'>
                      <Tab.Content>
                        <Tab.Pane eventKey='profile'>
                          <div
                            class='tab-pane fade show active'
                            id='home'
                            role='tabpanel'
                            aria-labelledby='home-tab'
                          >
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Name</label>
                              </div>
                              <div class='col-md-6'>
                                <p>{currentUser.username}</p>
                              </div>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Email</label>
                              </div>
                              <div class='col-md-6'>
                                <p>{currentUser.email}</p>
                              </div>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Works At</label>
                              </div>
                              <div class='col-md-6'>
                                <p><a href={`company/${companyID}`}>{company}</a></p>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='badges'>
                          <Badges></Badges>
                        </Tab.Pane>
                        <Tab.Pane eventKey='highscores'>
                          <HighScores></HighScores>
                        </Tab.Pane>
                        <Tab.Pane eventKey='edit'>
                          <div
                            class='tab-pane fade show active'
                            id='home'
                            role='tabpanel'
                            aria-labelledby='home-tab'
                          >
                            <div class='col-md-6'>
                              <Form.Group className='justify-content-center'>
                                <Tab.Pane eventKey='edit'>
                                  <Form.File
                                    className='userProfilePhotoInput'
                                    onChange={e =>
                                      uploadUserPhoto(e.target.files[0])
                                    }
                                    accept='.png,.jpg,.jpeg'
                                  />
                                </Tab.Pane>
                              </Form.Group>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Name</label>
                              </div>
                              <div class='col-md-6'>
                                <Form.Group
                                  className='usernameInput'
                                  controlId='formPlaintextEmail'
                                >
                                  <Form.Control
                                    defaultValue={currentUser.username}
                                    onChange={e => {
                                      setUsername(e.target.value)
                                    }}
                                  ></Form.Control>
                                </Form.Group>
                              </div>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Email</label>
                              </div>
                              <div class='col-md-6'>
                                <Form.Group
                                  className='emailInput'
                                  controlId='formPlaintextEmail'
                                >
                                  <p>
                                    <Form.Control
                                      disabled
                                      defaultValue={currentUser.email}
                                    ></Form.Control>
                                  </p>
                                </Form.Group>
                              </div>
                              <div class='row'>
                                <div class='col-md-6'>
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
                                </div>
                                </div>
                            </div>
                          </div>
                          <OverlayTrigger
                            delay={{ show: 5000, hide: 4000 }}
                            show={show}
                            placement='bottom'
                            overlay={popover}
                          >
                            <Button
                              className='settingsWideButton'
                              onClick={() => SaveUpdatedUserInfo()}
                            >
                              Save
                            </Button>
                          </OverlayTrigger>
                        </Tab.Pane>
                      </Tab.Content>
                      <div
                        class='tab-pane fade'
                        id='profile'
                        role='tabpanel'
                        aria-labelledby='profile-tab'
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Form>
        </Container>
      </Tab.Container>
    </>
  )
}
export default SettingsMenu

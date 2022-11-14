import {
  Nav,
  Row,
  Form,
  Tab,
  Col,
  Container,
  Button,
  Popover,
  OverlayTrigger,
  Image
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import Badges from '../Badges/Badges'
import './SettingsMenu.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import env from "react-dotenv";

/**
 * Creates and displays the Settings menu allows the user to toggle between diffrent settings.
 * @return {GetPage}
 */
const SettingsMenu = () => {
  axios.defaults.withCredentials = true
  const [currentUser, setCurrentUser] = useState([])
  const [newUserName, setUsername] = useState('')
  const [saveData, setSaveData] = useState(false)
  const [show, setShow] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [company, setCompany] = useState([])
  const [dueDate, setDueDate] = useState([])
  const [newPassword, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [message, setMessage] = useState('Saved!')
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser.userid)
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, {
          params: { id: currentUser.userid }
        })
        .then(response => {
          setProfilePic(response.data.profileImage)
        })
  }, [currentUser, profilePic])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/login`)
      .then(response => {
        setCurrentUser(response.data.user[0])
      })
      .catch(error => console.error(`Error ${error}`))
    setLoaded(true)
  }, [])

  //console.log(currentUser)

  useEffect(() => {
    if (isLoaded) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
          params: {
            the_query:
              'SELECT * FROM AffiliatedUsers JOIN Companies ON AffiliatedUsers.CompanyID = Companies.companyid WHERE UserID = ' +
              currentUser.userid
          }
        })
        .then(response => {
          if (response.data[0].DateJoined !== null) {
            setCompany(response.data[0].name)
            var date = new Date(response.data[0].DateJoined)
            setDueDate(date.toDateString())
          }
        })
        .catch(error => console.error(`Error ${error}`))
    }
  }, [currentUser, dueDate, isLoaded])

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
  }, [saveData, newUserName, currentUser.userid])

  setTimeout(() => {
    setShow(false)
  }, 9000)

  function uploadUserPhoto (userPhoto) {
    /*// console.log("unconverted photo", userPhoto)
        var convertedPhoto = URL.createObjectURL(userPhoto);
        // console.log("convertedPhoto: ", convertedPhoto)
        setConvertedProfilePicture(convertedPhoto);*/

    //TODO ... THEN call API method to store the image from (banner)
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
    setProfilePic(userPhoto)
  }

  function SaveUpdatedUserInfo () {
    setSaveData(true)
  }

  const NavToDash = () => {
    navigate('/dash')
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
        style={{ display: 'flex' }}
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
                      <h6>Web Developer and Designer</h6>
                      <p class='proile-rating'>
                        Module Progress : <span>65%</span>
                      </p>
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
                    <div class='profile-work'>
                      <p>Works at {company}</p>
                      <a href='www.google.com'>Website Link</a>
                      <br />
                      <a href=''>Company Profile</a>
                      <br />
                      <p>SKILLS</p>
                      <a href=''>Web Designer</a>
                      <br />
                      <a href=''>Web Developer</a>
                      <br />
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
                                <label>Phone</label>
                              </div>
                              <div class='col-md-6'>
                                <p>123 456 7890</p>
                              </div>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Profession</label>
                              </div>
                              <div class='col-md-6'>
                                <p>Web Developer and Designer</p>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='badges'>
                          <Badges></Badges>
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
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Phone</label>
                              </div>
                              <div class='col-md-6'>
                                <p>123 456 7890</p>
                              </div>
                            </div>
                            <div class='row'>
                              <div class='col-md-6'>
                                <label>Profession</label>
                              </div>
                              <div class='col-md-6'>
                                <p>Web Developer and Designer</p>
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
                        <div class='row'>
                          <div class='col-md-6'>
                            <label>Experience</label>
                          </div>
                          <div class='col-md-6'>
                            <p>Expert</p>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-6'>
                            <label>Hourly Rate</label>
                          </div>
                          <div class='col-md-6'>
                            <p>10$/hr</p>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-6'>
                            <label>Total Projects</label>
                          </div>
                          <div class='col-md-6'>
                            <p>230</p>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-6'>
                            <label>English Level</label>
                          </div>
                          <div class='col-md-6'>
                            <p>Expert</p>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-6'>
                            <label>Availability</label>
                          </div>
                          <div class='col-md-6'>
                            <p>6 months</p>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='col-md-12'>
                            <label>Your Bio</label>
                            <br />
                            <p>Your detail description</p>
                          </div>
                        </div>
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

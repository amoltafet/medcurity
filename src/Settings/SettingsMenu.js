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
        defaultActiveKey='first'
        style={{ display: 'flex' }}
      >
            <Container className='settingsContentPaneContainer'>
              <Tab.Content>
              <Nav
              variant='pills selectionBox'
              className='selectionBox justify-content-center'
            >
              <Nav.Item className='justify-content-center settingSpacing'>
                <Nav.Link
                  className=' justify-content-center selectedSetting'
                  eventKey='first'
                >
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='justify-content-center settingSpacing'>
                <Nav.Link
                  className=' unselectedSetting justify-content-center'
                  eventKey='second'
                >
                  Company Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='justify-content-center settingSpacing'>
                <Nav.Link
                  className=' unselectedSetting justify-content-center'
                  eventKey='third'
                >
                  Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
                <Tab.Pane eventKey='first'>
                  <div class='page-content page-container' id='page-content'>
                    <div class='padding'>
                      <div class='row container d-flex justify-content-center'>
                        <div class='col-md-12'>
                          <div class='card user-card-full'>
                            <div class='row m-l-0 m-r-0'>
                              <div class='col-sm-4 user-profile'>
                                <div class='card-block text-center text-white'>
                                  <Image
                                    className='settingsProfilePicture'
                                    variant='top'
                                    src={`data:image/png;base64,${profilePic}`}
                                    alt=''
                                    roundedCircle
                                  ></Image>
                                  <h6 class='f-w-600'>Hembo Tingor</h6>
                                  <p>Web Designer</p>
                                  <i class=' mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16'></i>
                                </div>
                              </div>
                              <div class='col-sm-8'>
                                <div class='card-block'>
                                  <h6 class='m-b-20 p-b-5 b-b-default f-w-600'>
                                    Information
                                  </h6>
                                  <div class='row'>
                                    <div class='col-sm-6'>
                                      <p class='m-b-10 f-w-600'>Email</p>
                                      <h6 class='text-muted f-w-400'>
                                        {currentUser.email}
                                      </h6>
                                    </div>
                                    <div class='col-sm-6'>
                                      <p class='m-b-10 f-w-600'>Phone</p>
                                      <h6 class='text-muted f-w-400'>
                                        1-800-656-3467
                                      </h6>
                                    </div>
                                  </div>
                                  <h6 class='m-b-20 m-t-40 p-b-5 b-b-default f-w-600'>
                                    Badges
                                  </h6>
                                  <div class='row'>
                                    <div class='col-sm-6'>
                                      <p class='m-b-10 f-w-600'>Recent</p>
                                      <h6 class='text-muted f-w-400'>
                                        badge name here
                                      </h6>
                                    </div>
                                    <div class='col-sm-6'>
                                      <p class='m-b-10 f-w-600'>Displayed Badge</p>
                                      <h6 class='text-muted f-w-400'>
                                        diplsayed badge
                                      </h6>
                                    </div>
                                  </div>
                                  <ul class='social-link list-unstyled m-t-40 m-b-10'>
                                    <li>
                                      <a
                                        href='#!'
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        title=''
                                        data-original-title='facebook'
                                        data-abc='true'
                                      >
                                        <i
                                          class='mdi mdi-facebook feather icon-facebook facebook'
                                          aria-hidden='true'
                                        ></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href='#!'
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        title=''
                                        data-original-title='twitter'
                                        data-abc='true'
                                      >
                                        <i
                                          class='mdi mdi-twitter feather icon-twitter twitter'
                                          aria-hidden='true'
                                        ></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href='#!'
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        title=''
                                        data-original-title='instagram'
                                        data-abc='true'
                                      >
                                        <i
                                          class='mdi mdi-instagram feather icon-instagram instagram'
                                          aria-hidden='true'
                                        ></i>
                                      </a>
                                    </li>
                                    <li>
                                    <Button className='settingsWideButton' onClick={NavToDash}>
                                        Back to Dashboard
                                    </Button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <Form>
                    <Form.Group
                      className='usernameInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text className='usernameText'>Company</Form.Text>
                      <Form.Control
                        disabled
                        defaultValue={company}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className='emailInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text className='emailText'>Date Joined</Form.Text>
                      <Form.Control
                        disabled
                        defaultValue={dueDate}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey='third'>
                  <Form>
                    <Form.Group className='justify-content-center'>
                      <Image
                        className='updateProfilePicture'
                        variant='top'
                        src={`data:image/png;base64,${profilePic}`}
                        alt=''
                        roundedCircle
                      ></Image>
                      <Form.File
                        className='userProfilePhotoInput'
                        onChange={e => uploadUserPhoto(e.target.files[0])}
                        accept='.png,.jpg,.jpeg'
                      />
                    </Form.Group>
                    <Form.Group
                      className='emailInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text className='emailText'>Email</Form.Text>
                      <Form.Control
                        disabled
                        defaultValue={currentUser.email}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className='usernameInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text className='usernameText'>Username</Form.Text>
                      <Form.Control
                        defaultValue={currentUser.username}
                        onChange={e => {
                          setUsername(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                    <h3>Change Password</h3>
                    <Form.Group
                      className='passwordInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text className='passwordText' id='newPasswordText'>
                        New Password
                      </Form.Text>
                      <Form.Control
                        type='password'
                        value={newPassword}
                        onChange={e => {
                          setPassword(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className='passwordInput'
                      controlId='formPlaintextEmail'
                    >
                      <Form.Text
                        className='passwordText'
                        id='repeatPasswordText'
                      >
                        Retype Password
                      </Form.Text>
                      <Form.Control
                        type='password'
                        value={repeatPassword}
                        onChange={e => {
                          setRepeatPassword(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
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
                  <Button className='settingsWideButton' onClick={NavToDash}>
                    Back to Dashboard
                  </Button>
                </Tab.Pane>
              </Tab.Content>
            </Container>
      </Tab.Container>
    </>
  )
}
export default SettingsMenu

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
import HighScores from '../HighScores/HighScores'
import './CompanySet.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import env from "react-dotenv";

/**
 * Creates and displays the Settings menu allows the user to toggle between diffrent settings.
 * @return {CompanySet}
 */
const CompanySet = () => {
  axios.defaults.withCredentials = true
  const [currentUser, setCurrentUser] = useState([])
  const [show, setShow] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [company, setCompany] = useState([])
  const [dueDate, setDueDate] = useState([])
  const [message, setMessage] = useState('Saved!')
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/login`)
      .then(response => {
        setCurrentUser(response.data.user[0])
      })
      .catch(error => console.error(`Error ${error}`))
    setLoaded(true)
  }, [])

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

  setTimeout(() => {
    setShow(false)
  }, 9000)

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
                          variant='top'
                          src={`https://clearbridgetech.com/wp-content/uploads/2022/10/Med.png`}
                          alt=''
                        ></Image>
                      </Form.Group>
                    </div>
                  </div>
                  <div class='col-md-6'>
                    <div class='profile-head'>
                      <h2>Medcurity</h2>
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
                                Info
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
                          <li class='nav-item'>
                            <Nav.Item className='justify-content-center settingSpacing'>
                              <Nav.Link
                                class='nav-link'
                                id='profile-tab'
                                data-toggle='tab'
                                role='tab'
                                aria-controls='profile'
                                aria-selected='false'
                                eventKey='users'
                              >
                                Employees
                              </Nav.Link>
                            </Nav.Item>
                          </li>
                        </Nav>
                      </ul>
                    </div>
                  </div>
                  <div class='col-md-2'></div>
                </div>
                <div class='row'>
                  <div class='col-md-4'></div>
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
                              <h4>
                                {' '}
                                Medcurity provides Customizable Policies and
                                Procedures for your HIPAA Security program.
                                Build right-sized policies with our guided
                                templates or upload your own policies.{' '}
                              </h4>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='badges'>
                          <Badges></Badges>
                        </Tab.Pane>
                        <Tab.Pane eventKey='highscores'>
                          {/* <HighScores></HighScores> */}
                          <h3>Total Company Points: 1400</h3>
                          <h3>Highest Scoring User: Jakob Kubicki</h3>
                        </Tab.Pane>
                        <Tab.Pane eventKey='users'>
                          User list goes here
                        </Tab.Pane>
                      </Tab.Content>
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
export default CompanySet

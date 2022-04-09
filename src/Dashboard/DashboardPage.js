import React from 'react';
import {Button, Image, Form, Card} from 'react-bootstrap'
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
import InvalidPage from '../InvalidPage/InvalidPage'
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar/MenuBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LearningModulesCards from './LearningModulesCards';
import LearningModulesDirectories from './LearningModuleDirectories';
import Axios from 'axios';

/**
* Creates and holds all of the componets for the Dashboard. 
* @return {DashboardPage}
*/
const DashboardPage = () => {
  Axios.defaults.withCredentials = true;
  const [session, setSession] = useState([]);
  const [profilePic, setProfilePic] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
      Axios.get("http://localhost:3002/users/login").then((response) => {
        setSession(response.data.user[0])
      }).catch(error => console.error(`Error ${error}`)); }, []);

  useEffect(() => { if (session.userid) Axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: session.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

  if (session?.userid)
  {
    return (
      <>
      <Form className="dash_page">
        <MenuBar></MenuBar>
          <div class="col dash_topBackdrop justif">
            <div class="dash_welcomeDiv">
              <Image className="dash_profilePicture" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
              <div>
                <h1 class="dash_welcomeMessageP1">Welcome back, {session?.username || "... "}!</h1>
                <h1 class="dash_welcomeMessageP3">Logged in as: {session?.email || "..."}</h1>
                <div class="dash_navDiv">
                  <div class="dash_navButtons">
                    <a href="#requiredModules" class="btn dash_navButton">Required Learning Modules</a>
                    <br></br>
                    <a href="#moduleDirectories" class="btn dash_navButton">Learning Module Directories</a>
                    <br></br>
                    <a href="#leaderboard" class="btn dash_navButton">Leaderboard</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div id="requiredModules" className="dash_requiredModules">
            <h1 className='dash_h1Style'>Required Learning Modules</h1> 
            <LearningModulesCards user={session} />
          </div>
    
          <div className="dash_separatorBegin"></div>
          
          <div id="moduleDirectories" className='dash_moduleDirectories'>
            <h1 className='dash_h1Style'> Additional Learning Modules</h1>
            <LearningModulesDirectories user={session}/>  
          </div>
    
          <div className="dash_separatorEnd"></div>
    
          <div id="leaderboard" className="dash_miniLeaderboard justify-center">
            <h1 className='dash_h1Style'>Leaderboard</h1>
            <Leaderboard user={session} ></Leaderboard>
            <a className='go_to_leader_board_bttn btn btn-primary' href="/leaderboard">View Full Leaderboard</a>
          </div>
          <br></br>
      </Form>
      </>
      );
  }
  else
  {
    return (
      <>
        <InvalidPage 
          redirectPage={'/'} 
          reason={"You need to be logged in to view your dashboard."}
          btnMessage={"Back to Login Page"}>
        </InvalidPage>
      </>
    )
  }
}

export default DashboardPage;

/*
          <WelcomePanel user={session} ></WelcomePanel> 
          <Leaderboard user={session} ></Leaderboard>
*/
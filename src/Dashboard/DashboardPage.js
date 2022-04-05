import React from 'react';
import {Button, Image, Form, Card} from 'react-bootstrap'
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
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

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          setSession(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`)); }, []);
    
  return (
    <>
    <Form className="dash_page">
      <MenuBar></MenuBar>
        <div className="col dash_topBackdrop justif">
          <div className="dash_welcomeDiv">
            <Image className="dash_profilePicture" variant="top" src="/user.png" alt="" roundedCircle />
            <div>
              <h1 className="dash_welcomeMessageP1">Welcome back, {session?.username || "... "}!</h1>
              <h1 className="dash_welcomeMessageP3">Logged in as: {session?.email || "..."}</h1>
              <div className="dash_navDiv">
                <div className="dash_navButtons">
                  <a href="#requiredModules" className="uvs-left btn dash_navButton">Required Learning Modules</a>
                  <br></br>
                  <a href="#moduleDirectories" className="uvs-left btn dash_navButton">Learning Module Directories</a>
                  <br></br>
                  <a href="#leaderboard" className="uvs-left btn dash_navButton">Leaderboard</a>
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
          <a className='uvs-left go_to_leader_board_bttn btn' href="/leaderboard">View Full Leaderboard</a>
        </div>
        <br></br>
    </Form>
    </>
  );
}

export default DashboardPage;
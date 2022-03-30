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
        <div class="col dash_topBackdrop">
          <div class="dash_welcomeDiv">
            <Image className="dash_profilePicture" variant="top" src="/user.png" alt="" roundedCircle />
            <div>
              <h1 class="dash_welcomeMessageP1">Welcome back, {session.username}!</h1>
              <h1 class="dash_welcomeMessageP3">Logged in as: {session.email}!</h1>
            </div>
          </div>
          <div class="dash_navDiv">
            <div class="col dash_navButtons">
              <a href="#requiredModules" class="btn btn-primary">Required Learning Modules</a>
              <br></br>
              <a href="#moduleDirectories" class="btn btn-primary">Learning Module Directories</a>
              <br></br>
              <a href="#leaderboard" class="btn btn-primary">Leaderboard</a>
            </div>
          </div>
        </div>

        <div id="requiredModules" className="dash_requiredModules">
          <h1 className='dash_h1Style'>Required Learning Modules</h1> <LearningModulesCards user={session} />
        </div>

        <div className="dash_separatorBegin"></div>
        
        <div id="moduleDirectories" className='dash_moduleDirectories'>
          <h1 className='dash_h1Style'>Learning Module Directories</h1>
          <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
          <LearningModulesDirectories user={session}/>  
        </div>

        <div className="dash_separatorEnd"></div>

        <div id="leaderboard" class="dash_miniLeaderboard justify-center">
          <h1 className='dash_h1Style'>Leaderboard</h1>
          <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
          <Leaderboard user={session} ></Leaderboard>
          <a href="/leaderboard" class="btn btn-primary">View Full Leaderboard</a>
        </div>
        <div class="col dash_bottomBackdrop">

        </div>
    </Form>
    </>
  );
}

export default DashboardPage;

/*
          <WelcomePanel user={session} ></WelcomePanel> 
          <Leaderboard user={session} ></Leaderboard>
*/
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
        <h1 className='dash_h1Style'>Personal Dashboard</h1>
        <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
        <div class="dash_topBackdrop">
          <div class="dash_welcomeDiv">
            <Image className="dash_profilePicture" variant="top" src="/user.png" alt="" roundedCircle />
            <h1 class="dash_welcomeMessageP1">Welcome back,</h1>
            <h1 class="dash_welcomeMessageP2">{session.username}!</h1>
          </div>
          <div class="dash_miniLeaderboard ">
            <Leaderboard user={session} ></Leaderboard>
          </div>
        </div>

        <div className="dash_requiredModules">
          <h1 className='dash_h1Style'>Required Learning Modules</h1> <LearningModulesCards user={session} />
        </div>

        <div className="dash_separator"></div>
        
        <div className='dash_moduleDirectories'>
          <h1 className='dash_h1Style'>Learning Module Directories</h1>
          <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
          <LearningModulesDirectories user={session}/>  
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
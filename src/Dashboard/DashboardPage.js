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
        <div class="row dash_topBackdrop">
          <div class="col-md-3 dash_welcomeDiv">
            <Image className="dash_profilePicture" variant="top" src="/user.png" alt="" roundedCircle />
            <h1 class="dash_welcomeMessageP1">Welcome back,</h1>
            <h1 class="dash_welcomeMessageP2">{session.username}!</h1>
            <h1 class="dash_welcomeMessageP3">{session.email}!</h1>
          </div>
          <div class="col-md-6 dash_navDiv">
            <Button variant="secondary" type="button">Required Modules</Button>
            <Button variant="secondary" type="button">Learning Modulse</Button>
            <Button variant="secondary" type="button">Leaderboard</Button>
          </div>
        </div>

        <div className="dash_requiredModules">
          <h1 className='dash_h1Style'>Required Learning Modules</h1> <LearningModulesCards user={session} />
        </div>

        <div className="dash_separatorBegin"></div>
        
        <div className='dash_moduleDirectories'>
          <h1 className='dash_h1Style'>Learning Module Directories</h1>
          <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
          <LearningModulesDirectories user={session}/>  
        </div>

        <div className="dash_separatorEnd"></div>

        <div class="dash_miniLeaderboard justify-center">
          <h1 className='dash_h1Style'>Leaderboard</h1>
          <p className='dash_pStyle'>The quick brown fox jumps over the lazy dog.</p>
          <Leaderboard user={session} ></Leaderboard>
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
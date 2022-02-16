import React from 'react';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck} from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar/MenuBar';
import LearningModulesCards from './LearningModulesCards';
import LearningModulesDirectories from './LearningModuleDirectories';


/**
* Creates and holds all of the componets for the Dashboard. 
* @return {DashboardPage}
*/
const DashboardPage = () => {
  return (
    <>
      <MenuBar></MenuBar>
      <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel></WelcomePanel> 
          <Leaderboard></Leaderboard>
        </CardDeck>
        <LearningModulesCards/>
        <LearningModulesDirectories/>
    </>
  );
}

export default DashboardPage;
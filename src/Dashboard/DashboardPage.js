import React from 'react';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck, Container} from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
import TestPanel from './TestPanel';
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar';


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
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            <TestPanel title="HIPPA" link="3"/>
            <TestPanel title="Privacy" link="1"/>
            <TestPanel title="Security" link="2"/>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
        </CardDeck>
    </>
  );
}

export default DashboardPage;
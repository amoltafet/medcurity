import React from 'react';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck, Container} from 'react-bootstrap'
import MenuBarDashboard from './MenuBarDashboard';
import WelcomePanel from './WelcomePanel';
import TestPanel from './TestPanel';
import Leaderboard from './DashLeaderboard';




const DashboardPage = () => {
  return (
    <>
      <MenuBarDashboard ></MenuBarDashboard> 
      <Container>
      <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel></WelcomePanel> 
          <Leaderboard></Leaderboard>
        </CardDeck>
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
         
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
         
        </CardDeck>
    </>
  );
}

export default DashboardPage;

import React from 'react';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck, Container} from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
import TestPanel from './TestPanel';
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar';




const DashboardPage = () => {
  return (
    <>
      <MenuBar></MenuBar> 
      <Container className ="dashContainer">
      <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
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

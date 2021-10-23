import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck, Container} from 'react-bootstrap'
import MenuBar from './MenuBar';
import WelcomePanel from './WelcomePanel';
import TestPanel from './TestPanel';
import Leaderboard from './Leaderboard';




function App() {
  return (
    <>
      <MenuBar></MenuBar> 
      <Container className="dashboard">
        <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel></WelcomePanel> 
          <Leaderboard></Leaderboard>
        </CardDeck>
          
        <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
         
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
            <TestPanel></TestPanel>
         
        </CardDeck>
    </Container>
    </>
  );
}

export default App;

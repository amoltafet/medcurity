import {Row, Col, CardDeck, Container, CardGroup} from 'react-bootstrap'
import MenuBar from './MenuBar';
import WelcomePanel from './WelcomePanel';
import TestPanel from './TestPanel';
import Leaderboard from './Leaderboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


function Dashboard() {
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

export default Dashboard;

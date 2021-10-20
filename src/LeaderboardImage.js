import React from 'react';
import './LeaderboardImage.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Image} from 'react-bootstrap'

const LeaderboardImage = () => {
  return (
    <>
    <Container className="leaderboardContainer">
        <Image className="leaderboardImage" variant="top" src="/leaderboard.jpg" alt=""></Image>
        <Button href="/dashboard">X</Button>
    </Container>
    </>
  );
}

export default LeaderboardImage;

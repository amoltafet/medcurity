import React from 'react';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { CardDeck } from 'react-bootstrap'
import WelcomePanel from './WelcomePanel';
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar/MenuBar';
import { useEffect, useState } from 'react';
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
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
      }, []);

    console.log(session)

  return (
    <>
		<MenuBar></MenuBar>
		<CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
			<WelcomePanel user={session} ></WelcomePanel> 
			<Leaderboard user={session} ></Leaderboard>
        </CardDeck>
        <LearningModulesCards user={session} />
        <LearningModulesDirectories/>
    </>
  );
}

export default DashboardPage;
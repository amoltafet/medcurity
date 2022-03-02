import React from 'react';
import './../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck} from 'react-bootstrap'
import MenuBar from '../MenuBar/MenuBar';               
import EmployeeCards from './EmployeeCards';
import EmployerJoinRequests from './EmployerJoinRequests'
import WelcomePanel from './../Dashboard/WelcomePanel'
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the Dashboard. 
* @return {EmployerDashboardPage}
*/
const EmployerDashboardPage = () => {
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        });
      }, []);

    console.log(session)


    return (
    <>
        <MenuBar></MenuBar>
        <WelcomePanel user={session} subtitle={'to the Administration Page'}/>
        <EmployerJoinRequests />
        <EmployeeCards />
        
    </>
  );
}
/*
<CardDeck className="employeeDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloEmployer></HelloEmployer>
        </CardDeck>
        <EmployeeCards></EmployeeCards>
*/

export default EmployerDashboardPage;
import React from 'react';
import './../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';               
import EmployerCards from './EmployerCards';
import WelcomePanel from '../Dashboard/WelcomePanel';
import AdminInvitations from './AdminInvitations';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the Admin Dashboard. 
* @return {AdminDashboardPage}
*/
const AdminDashboardPage = () => {
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
        <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel user={session} subtitle={'to the Administration Page'}/>
          <AdminInvitations />
        </CardDeck>
        <EmployerCards />
        
    </>
  );
}
/*
<CardDeck className="EmployerDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloAdmin></HelloAdmin>
        </CardDeck>
        <EmployerCards></EmployerCards>
*/

export default AdminDashboardPage;
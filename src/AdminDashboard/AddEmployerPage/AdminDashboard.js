import React from 'react';
import './../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import EmployerCards from './EmployerCards';
import WelcomePanel from '../../Dashboard/WelcomePanel';
import AdminInvitations from './AdminInvitations';
import { useEffect, useState, Link} from "react";
import AddCompany from './AddCompany';
import { useParams } from "react-router";
import axios from 'axios';
import DeleteCompany from './DeleteCompany';
import InvalidPage from '../../InvalidPage/InvalidPage';


/**
* Creates and holds all of the componets for the Admin Dashboard. 
* @return {AdminDashboardPage}
*/
const AdminDashboardPage = () => {
    axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setSession(response.data.user[0])
        });
      }, []);

    console.log(session)

    if(session?.id && setSession.type == "websiteAdmin") {
      return (
      <>
          <MenuBar></MenuBar>
          <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
            <AddCompany />
            <AdminInvitations />
            <DeleteCompany />
          </CardDeck>
          <EmployerCards />
          
      </>
      );
    }
    else
    {
      return (
        <>
          <InvalidPage 
            redirectPage={'/'} 
            reason={"You need to be logged in to view your dashboard."}
            btnMessage={"Back to Login Page"}>
          </InvalidPage>
        </>
      )
    }
}
/*
<CardDeck className="EmployerDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloAdmin></HelloAdmin>
        </CardDeck>
        <EmployerCards></EmployerCards>
*/

export default AdminDashboardPage;
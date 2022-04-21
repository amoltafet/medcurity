import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import EmployerCards from './EmployerCards';
import AdminInvitations from './AdminInvitations';
import { useEffect, useState } from "react";
import AddCompany from './AddCompany';
import { useParams } from "react-router";
import axios from 'axios';
import DeleteCompany from './DeleteCompany';
import InvalidPage from '../../InvalidPage/InvalidPage';
import env from "react-dotenv";

/**
* Creates and holds all of the componets for the Admin Dashboard. 
* @return {AdminDashboardPage}
*/
const AdminDashboardPage = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0])
        });
      }, []);


    if (currentUser?.type === "websiteAdmin") {

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
            reason={"Only website admins can access this page."}
            btnMessage={"Back to Medcurity Learn Security"}>
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
import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import EmployerCards from './EmployerCards';
import AdminInvitations from './AdminInvitations';
import { useEffect, useState } from "react";
import AddCompany from './AddCompany';
import Axios from 'axios';
import DeleteCompany from './DeleteCompany';
import InvalidPage from '../../InvalidPage/InvalidPage';


/**
* Creates and holds all of the componets for the Admin Dashboard. 
* @return {AdminDashboardPage}
*/
const AdminDashboardPage = () => {
    Axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setCurrentUser(response.data.user[0])
        });
      }, []);

    console.log(currentUser)

    if(currentUser?.id && setCurrentUser.type == "websiteAdmin") {
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
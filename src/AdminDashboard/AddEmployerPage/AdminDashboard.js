import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck, Col, Row } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import EmployerCards from './EmployerCards';
import AdminInvitations from './AdminInvitations';
import { useEffect, useState } from "react";
import AddCompany from './AddCompany';
import axios from 'axios';
import DeleteCompany from './DeleteCompany';
import InvalidPage from '../../InvalidPage/InvalidPage';


/**
* Creates and holds all of the componets for the Admin Dashboard. 
* @return {AdminDashboardPage}
*/
const AdminDashboardPage = () => {
     axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
          console.log('aaahhh', response.data.user)
          setCurrentUser(response.data.user[0])
        });
      }, []);


    if (currentUser?.type === "websiteAdmin") {

      return (
      <>
          <MenuBar></MenuBar>
          <CardDeck className="" style={{display: 'flex', flexDirection: 'row'}}>
            <Row>
              <Col xs={12} lg={4}>
                <AddCompany />
              </Col>
              <Col xs={12} lg={4}>
                <AdminInvitations />
              </Col>
              <Col xs={12} lg={4}> 
                <DeleteCompany />
              </Col>
            </Row>
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
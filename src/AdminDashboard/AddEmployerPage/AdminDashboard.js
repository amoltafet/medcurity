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
// import env from "react-dotenv";

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
        }).catch(error => console.error(`Error ${error}`));
      }, []);


    if (currentUser?.type === "websiteAdmin") {

      return (
      <>
          <MenuBar></MenuBar>
          <CardDeck className="justify-content-center" style={{display: 'flex', flexDirection: 'row'}}>
            <Row lg={12}>
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
            <Row className="justify-content-center">
            <Col xs={11} lg={12}>
              <EmployerCards />
              </Col>
            </Row>
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
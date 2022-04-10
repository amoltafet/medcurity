import React from 'react';
import './../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import LearningManagerCards from './ContentCards';
import WelcomePanel from '../../Dashboard/WelcomePanel';
import { useEffect, useState } from "react";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* @return {AdminContentPage}
*/
const AdminContentPage = () => {
    //Axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [companyId/*, setCompanyId*/] = useState('');

  Axios.defaults.withCredentials = true;

  useEffect(() => {
      Axios.get("http://localhost:3002/users/login").then((response) => {
        console.log('aaahhh', response.data.user)
        setCurrentUser(response.data.user[0])
      }).catch(error => console.error(`Error ${error}`));
    }, []);

    // useEffect(() => {
    //     Axios.get("http://localhost:3002/users/login").then((response) => {
    //       setSession(response.data.user[0])
    //     });
	// }, []);

    // useEffect(() => {
    //     if (session.userid != undefined) {
    //         setLoading(false)
    //     }
    // }, [currentUser])

    // // Query for getting user's required learning modules
    // useEffect(() => {
    //     if (!isLoading) {
    //         Axios.get('http://localhost:3002/api/getQuery', 
    //             { params: { the_query: 'SELECT CompanyAdmins.CompanyID ' +
    //             'FROM CompanyAdmins ' +
    //             'WHERE CompanyAdmins.UserID = ' + String(session.userid)} 
    //             }).then((response) => {
    //                 setCompanyId(Object.values(response.data)[0].CompanyID)
    //         });            
    //     }
    // }, [isLoading])

    return (
    <>
        <MenuBar></MenuBar>
        <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel user={currentUser} subtitle={'to the Learning Manager Page'}/>
        </CardDeck>
        <LearningManagerCards companyId={companyId}/>
        
    </>
  );
}
/*
<CardDeck className="LearningManagerDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloLearningManager></HelloLearningManager>
        </CardDeck>
        <LearningManagerCards></LearningManagerCards>
*/

export default AdminContentPage;
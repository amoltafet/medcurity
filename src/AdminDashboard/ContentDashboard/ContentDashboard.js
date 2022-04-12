import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';               
import LearningManagerCards from './ContentCards';
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
    const [profilePic, setProfilePic] = useState("/user.png");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
      Axios.get("http://localhost:3002/users/login").then((response) => {
        console.log('aaahhh', response.data.user)
        setCurrentUser(response.data.user[0])
      }).catch(error => console.error(`Error ${error}`));
    }, []);
    useEffect(() => { if (currentUser.userid) Axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: currentUser.userid }} ).then((response) => { setProfilePic(response.data.profileImage) }); })

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
        <div className="col dash_topBackdrop justif">
          <div className="dash_welcomeDiv">
            <Image className="dash_profilePicture" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
            <div>
              <h1 className="dash_welcomeMessageP1">Welcome Back, Admin {currentUser?.username || "... "}!</h1>
              <h1 className="dash_welcomeMessageP3">Logged in as: {currentUser?.email || "..."}</h1>
              <div className="dash_navDiv">
              </div>
            </div>
          </div>
        </div>
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
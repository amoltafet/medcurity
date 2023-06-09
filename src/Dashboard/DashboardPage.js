import React from 'react';
import { Image, Form } from 'react-bootstrap';
import './DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InvalidPage from '../InvalidPage/InvalidPage';
import Leaderboard from './DashLeaderboard';
import MenuBar from '../MenuBar/MenuBar';
import { useEffect, useState } from 'react';
import LearningModulesCards from './LearningModulesCards';
import LearningModulesDirectories from './LearningModuleDirectories';
import axios from 'axios';
import { Divider } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Button } from '@mui/material';
import SideBar from '../MenuBar/SideBar';
// import env from "react-dotenv";

/**
* Creates and holds all of the componets for the Dashboard. 
* @return {DashboardPage}
*/
const DashboardPage = () => {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);


  useEffect(() => { if (currentUser.userid)  axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: currentUser.userid } }).then((response) => { setProfilePic(response.data.profileImage) }); })

  const printUserType = (type) =>
  {
    switch(type)
    {
      case "user":
        return "user"
      case "companyAdmin":
        return "Company Admin"
      case "websiteAdmin":
        return "Website Admin"
      default:
        return "Unknown"
    }
  }
  
  if (currentUser?.userid) {
    return (
      <Grid container >
        <div>
            <SideBar />
        </div>
        <Grid sx={{ flexGrow: 1 }} item>
        <MenuBar/>
        
          

          <Grid container style={{alignItems: 'center', justifyContent: 'center', height: '45vh'}} className="dash-container">
            <Grid item>
              <Image className="dash_profilePicture uvs-left" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
            </Grid>
            <Grid item>
              <h1 className="dash_welcomeMessageP1">Welcome back, {currentUser?.username || "... "}!</h1>
              <h1 className="dash_welcomeMessageP3">Logged in as {printUserType(currentUser.type)}: {currentUser?.email || "..."}</h1>
              <div className="dash_navDiv">
                    <div className="dash_navButtons">
                    <Button variant="outlined" sx={{color: 'white', borderColor: 'white', margin: '5px', ":hover": {backgroundColor: 'white', color: 'black'}}} href="#requiredModules">Required Learning Modules</Button>
                    <Button variant="outlined" sx={{color: 'white', borderColor: 'white', margin: '5px', ":hover": {backgroundColor: 'white', color: 'black'}}} href="#moduleDirectories">Additional Learning Modules</Button>
                    <Button variant="outlined" sx={{color: 'white', borderColor: 'white', margin: '5px', ":hover": {backgroundColor: 'white', color: 'black'}}} href="#board">Leaderboard</Button>
                    </div>
                  </div>
            </Grid>
        </Grid>
        <div id="requiredModules" />
          <LearningModulesCards user={currentUser} id="requiredModules"/>
          <Divider/>
          <div id="moduleDirectories" />
          <LearningModulesDirectories user={currentUser} id="moduleDirectories"/>

            <div className="container" style={{
                marginTop: '30px',
            }}>
              <h1 className='dash_h1Style'>Leaderboard</h1>
              <Leaderboard user={currentUser} ></Leaderboard>
              <Button variant="outlined"  href="/leaderboard" style={{
                marginTop: '30px',
              }}>View Full Leaderboard</Button>
            </div>
          <br></br>

        </Grid>
        <Grid container sx={{
          padding: '10px',
          width: '100%',
          height: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          flexGlow: 1,

        }}>
          
          <p className="dash_footerText ">© 2023 Medcurity. All rights reserved.</p>
        </Grid>

       </Grid>
      
    );
  }
  else {
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

export default DashboardPage;
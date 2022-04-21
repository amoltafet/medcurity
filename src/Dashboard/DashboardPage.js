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

/**
* Creates and holds all of the componets for the Dashboard. 
* @return {DashboardPage}
*/
const DashboardPage = () => {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/users/login").then((response) => {
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);

  useEffect(() => { if (currentUser.userid)  axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: currentUser.userid } }).then((response) => { setProfilePic(response.data.profileImage) }); })

  if (currentUser?.userid) {

    return (
      <>
        <Form className="dash_page">
          <MenuBar></MenuBar>
          <div className="col dash_topBackdrop justif">
            <div className="dash_welcomeDiv">
              <Image className="dash_profilePicture uvs-left" variant="top" src={`data:image/png;base64,${profilePic}`} alt="" roundedCircle />
              <div>
                <h1 className="dash_welcomeMessageP1">Welcome back, {currentUser?.username || "... "}!</h1>
                <h1 className="dash_welcomeMessageP3">Logged in as: {currentUser?.email || "..."}</h1>
                <div className="dash_navDiv">
                  <div className="dash_navButtons">
                    <a href="#requiredModules" className="uvs-left btn dash_navButton">Required Learning Modules</a>
                    <br></br>
                    <a href="#moduleDirectories" className="uvs-left btn dash_navButton">Additional Learning Modules</a>
                    <br></br>
                    <a href="#leaderboard" className="uvs-left btn dash_navButton">Leaderboard</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="requiredModules" className="dash_requiredModules">
            <h1 className='dash_h1Style'>Required Learning Modules</h1>
            <LearningModulesCards user={currentUser} />
          </div>
          <div className="dash_separatorBegin"></div>
          <div id="moduleDirectories" className='dash_moduleDirectories'>
            <h1 className='dash_h1Style'> Additional Learning Modules</h1>
            <LearningModulesDirectories user={currentUser} />
          </div>
          <div className="dash_separatorEnd"></div>
          <div id="leaderboard" className="dash_miniLeaderboard justify-center">
            <h1 className='dash_h1Style'>Leaderboard</h1>
            <Leaderboard user={currentUser} ></Leaderboard>
            <a className='uvs-left go_to_leader_board_bttn btn' href="/leaderboard">View Full Leaderboard</a>
          </div>
          <br></br>
        </Form>
      </>
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
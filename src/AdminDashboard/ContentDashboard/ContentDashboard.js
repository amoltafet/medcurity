import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';
import LearningManagerCards from './ContentCards';
import { useEffect, useState } from "react";
import Axios from 'axios';
import InvalidPage from '../../InvalidPage/InvalidPage';


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
  useEffect(() => { if (currentUser.userid) Axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: currentUser.userid } }).then((response) => { setProfilePic(response.data.profileImage) }); })



  if (currentUser?.id && currentUser.type == "websiteAdmin") {

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
        <LearningManagerCards companyId={companyId} />

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
export default AdminContentPage;
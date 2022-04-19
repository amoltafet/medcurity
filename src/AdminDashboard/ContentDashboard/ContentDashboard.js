import React from 'react';
import '../../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import MenuBar from '../../MenuBar/MenuBar';
import LearningManagerCards from './ContentCards';
import { useEffect, useState } from "react";
import axios from 'axios';
import InvalidPage from '../../InvalidPage/InvalidPage';


/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* @return {AdminContentPage}
*/
const AdminContentPage = () => {
  // axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState([]);
  const [companyId/*, setCompanyId*/] = useState('');
  const [profilePic, setProfilePic] = useState("/user.png");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3002/users/login").then((response) => {
      console.log('aaahhh', response.data.user)
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);
  useEffect(() => { if (currentUser.userid)  axios.get("http://localhost:3002/api/getProfilePicture", { params: { id: currentUser.userid } }).then((response) => { setProfilePic(response.data.profileImage) }); })


    if (currentUser?.type === "websiteAdmin") {
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
            reason={"Only website admins can access this page."}
            btnMessage={"Back to Medcurity Learn Security"}>
          </InvalidPage>
        </>
      )
    }
}
export default AdminContentPage;
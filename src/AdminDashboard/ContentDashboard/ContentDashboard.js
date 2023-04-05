import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Box } from '@material-ui/core';
import MenuBar from '../../MenuBar/MenuBar';
import ContentCards from './ContentCards';
import { useEffect, useState } from "react";
import axios from 'axios';
import InvalidPage from '../../InvalidPage/InvalidPage';

const AdminContentPage = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [companyId/*, setCompanyId*/] = useState('');
  const [profilePic, setProfilePic] = useState("/user.png");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);

  useEffect(() => { 
    if (currentUser?.userid) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: currentUser.userid } }).then((response) => { 
        setProfilePic(response.data.profileImage) 
      });
    }
  });

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
        <Container className="d-flex justify-content-center">
          <div className="col-md-8">
            <ContentCards companyId={companyId} />
          </div>
        </Container>
      </>
    );
      
  } else {
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

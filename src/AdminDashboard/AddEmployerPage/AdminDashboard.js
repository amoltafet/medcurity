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
import SideBar from '../../MenuBar/SideBar';
import Grid from '@mui/material/Grid';
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
        <Grid container >
                <div>
            <SideBar />
             </div>
          <Grid sx={{ flexGrow: 1 }} item>
              <Grid item >
                <AddCompany />
              </Grid>
              <Grid item >
                <AdminInvitations />
              </Grid>
              <Grid item >
                <DeleteCompany />
              </Grid>
            
              <EmployerCards />
            </Grid>
        </Grid>
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


export default AdminDashboardPage;
import {Container} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './SettingsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import SettingsMenu from './SettingsMenu';
import InvalidPage from '../InvalidPage/InvalidPage'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import SideBar from '../MenuBar/SideBar';
// import env from "react-dotenv";

/**
* Creates and displays each the main settings page. 
* @return {SettingsPage}
*/
const SettingsPage = () => {
    const [currentUser, setCurrentUser] = useState([]);

    // get the user's session if any to determine if they can
    // access their settings page
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
        if (response.data.user)
        {
            setCurrentUser(response.data.user[0])
        }
        else
        {
            setCurrentUser(null)
        }
        }).catch(error => console.error(`Error ${error}`)); }, []);

    if (currentUser)
    {
        return (
            <Grid container>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10}>
            <MenuBar></MenuBar>
         
            <SettingsMenu></SettingsMenu>
            
            <div className="footer">
                <Container>
                    <p className="text-muted">© Medcurity 2023, All Rights Reserved</p>
                </Container>
            </div>
            </Grid>
            </Grid>
        );
    }
    else
    {
        return (
            <>
              <InvalidPage 
                redirectPage={'/'} 
                reason={"You need to be logged in to modify your user settings."}
                btnMessage={"Back to Login Page"}>
              </InvalidPage>
            </>
          )
    }
}
export default SettingsPage;
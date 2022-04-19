import {Container} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './SettingsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import SettingsMenu from './SettingsMenu';
import InvalidPage from '../InvalidPage/InvalidPage'

/**
* Creates and displays each the main settings page. 
* @return {SettingsPage}
*/
const SettingsPage = () => {
    const [currentUser, setCurrentUser] = useState([]);

    // get the user's session if any to determine if they can
    // access their settings page
    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
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
            <>
            <MenuBar></MenuBar>
            <Container fluid="md" className="settingsMenuContainer">
            <SettingsMenu></SettingsMenu>
            </Container> 
            </>
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
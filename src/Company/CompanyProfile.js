import {Container} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './CompanyProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import CompanySet from './CompanySet';
import InvalidPage from '../InvalidPage/InvalidPage'

/**
* Creates and display the company profile page
* @return {CompanyProfile}
*/
const CompanyProfile = () => {
    const [currentUser, setCurrentUser] = useState([]);

    // get the user's session if any to determine if they can
    // access and edit the company settings
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
            <>
            <MenuBar></MenuBar>
            <Container fluid="md" className="CompanySetContainer">
            <CompanySet></CompanySet>
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
                reason={"You need to be logged in to modify company settings."}
                btnMessage={"Back to Login Page"}>
              </InvalidPage>
            </>
          )
    }
}
export default CompanyProfile;
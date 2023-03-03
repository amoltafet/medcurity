/*
File Name: LearningManagerDashboard.js
Description: This file contains the page that allows an employer to
    assign learning modules to their employees, change due dates, and remove them. 
    Multiple widgets are contained in this page that allow for different functions. 
Last Modified: February 14, 2023
*/

import React from 'react';
import '../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';
import LearningManagerCards from './LearningManagerCards';
import InvalidPage from '../InvalidPage/InvalidPage';
import WelcomePanel from '../Dashboard/WelcomePanel';
import LearningModuleAdder from './LearningManagerAdder';
import { useEffect, useState} from "react";
import axios from 'axios';
import SideBar from '../MenuBar/SideBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* Gets current user info and passes to other components
* @return {} LearningManagerDashboardPage
*/
const LearningManagerDashboardPage = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [companyID, setCompanyID] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);

    // Resets reload after it has been triggered
    useEffect(() => {
        setReload(false);
    }, [reload]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
           setCurrentUser(response.data.user[0]);
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    useEffect(() => {
        if (currentUser.userid !== undefined) {
            setLoading(false)
        }
    }, [currentUser])

    // Query for getting companyid of associated user
    useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                {
                    params: {
                        the_query: 'SELECT CompanyAdmins.CompanyID FROM CompanyAdmins ' +
                        'WHERE CompanyAdmins.UserID = ' + String(currentUser.userid)
                    }
                }).then((response) => {
                    setCompanyID(Object.values(response.data)[0].CompanyID)
                });
        }
    }, [isLoading, currentUser.userid])

    if (currentUser?.type === 'companyAdmin' || currentUser?.type === 'websiteAdmin') {
        return (
            <Grid container>
        <Grid item xs={2}>
            <SideBar />
        </Grid>
        <Grid item xs={10}>
        <MenuBar></MenuBar>
  
                <Row className="justify-content-center">
                    <Col xs={11} md={7} lg={7} className="margin_bottom_learning_manager">
                        <WelcomePanel user={currentUser} pageTitle={"Learning Module Manager"} />
                    </Col>
                    <Col xs={11} md={4} lg={4} className="margin_bottom_learning_manager">
                        <LearningModuleAdder companyID={companyID} reload={reload} setReload={setReload} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={11} md={11} lg={11} className="margin_bottom_learning_manager">
                        <LearningManagerCards companyID={companyID} reload={reload} setReload={setReload} />
                    </Col>
                </Row>
            </Grid>
        </Grid>
        );
    }
    else {
        return (
            <>
                <InvalidPage
                    redirectPage={'/'}
                    reason={"Only company admins can access this page."}
                    btnMessage={"Back to Medcurity Learn Security"}>
                </InvalidPage>
            </>
        )
    }
}

export default LearningManagerDashboardPage;
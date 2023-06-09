import React from 'react';
import '../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';
import EmployeeCards from './EmployeeCards';
import WelcomePanel from '../Dashboard/WelcomePanel';
import EmployerInvitations from './EmployerInvitations';
import EmployerResetUsersStats from './EmployerResetUsersStats';
import InvalidPage from '../InvalidPage/InvalidPage';
import { useEffect, useState } from "react";
import axios from 'axios';
import SideBar from '../MenuBar/SideBar';
import Grid from '@mui/material/Grid';
// import env from "react-dotenv";

/**
* Creates and holds all of the componets for the employer Dashboard. 
* @return {EmployerDashboardPage}
*/
const EmployerDashboardPage = () => {
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);

    // Resets reload after it has been triggered
    useEffect(() => {
        setReload(false)
    }, [reload]);

    // Get user data
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    // Sets loading state for latter use effects
    useEffect(() => {
        if (currentUser.userid !== undefined) {
            setLoading(false)
        }
    }, [currentUser, currentUser.userid])

    // Query for getting companyid of associated user
    useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,
                {
                    params: {
                        the_query: 'SELECT CompanyAdmins.CompanyID ' +
                            'FROM CompanyAdmins ' +
                            'WHERE CompanyAdmins.UserID = ' + String(currentUser.userid)
                    }
                }).then((response) => {
                    setCompanyId(Object.values(response.data)[0].CompanyID)
                });
        }
    }, [isLoading, currentUser.userid])

    if (currentUser?.type === 'companyAdmin' || currentUser?.type === 'websiteAdmin') {
        return (
            <Grid container>
            <Grid item >
                <SideBar />
            </Grid>
            <Grid item xs={12} sm >
            <MenuBar></MenuBar>

            <Row className="justify-content-center">
                    <Col xs={11} md={7} lg={7} className="margin_bottom_learning_manager">
                    <WelcomePanel user={currentUser} pageTitle={"Employer Dashboard"} />
                    </Col>
                    <Col xs={11} md={4} lg={4} className="margin_bottom_learning_manager">
                    <EmployerInvitations companyId={companyId} reload={reload} setReload={setReload} />
                    </Col>
                </Row>

                    <Grid item xs={12}>
                        <EmployerResetUsersStats companyId={companyId} setReload={setReload}></EmployerResetUsersStats>
                    </Grid>
                    <Grid item xs={12} sx={{
                        marginLeft: '35px',
                        marginRight: '35px',
                        marginBottom: '35px',
                    }}>
                    <EmployeeCards user={currentUser} companyId={companyId} reload={reload} setReload={setReload} />
                    </Grid>
            </Grid>
        
            </Grid>

                    
            )
            ;
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

export default EmployerDashboardPage;
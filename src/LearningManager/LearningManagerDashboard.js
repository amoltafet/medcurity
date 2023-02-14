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
// import env from "react-dotenv";

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
        setReload(false)
    }, [reload]);

    useEffect(() => {
        /* FIX FIX FIX */
        // let user = {userid: 265, companyid: 0, username: 'employer1', type: 'companyAdmin', email: 'employer1@gmail.com',
        // active: 1, datejoined: "2022-10-01T19:34:23.000Z", loggedInAt: "Tue Feb 14 2023 01:16:50 GMT-0800 (Pacific Standard Time)",
        // personal: null, profilepicture: null}
        // setCurrentUser(user)

        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
           console.log(response.data.user[0]);
           setCurrentUser(response.data.user[0])
        });
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
                        the_query: 'SELECT CompanyAdmins.CompanyID ' +
                            'FROM CompanyAdmins ' +
                            'WHERE CompanyAdmins.UserID = ' + String(currentUser.userid)
                    }
                }).then((response) => {
                    setCompanyID(Object.values(response.data)[0].CompanyID)
                });
        }
    }, [isLoading, currentUser.userid])

    if (currentUser?.type === 'companyAdmin' || currentUser?.type === 'websiteAdmin') {
        return (
            <>
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
                        <LearningManagerCards companyId={companyID} reload={reload} setReload={setReload} />
                    </Col>
                </Row>
            </>
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
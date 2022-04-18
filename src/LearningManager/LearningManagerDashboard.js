import React from 'react';
import '../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';
import LearningManagerCards from './LearningManagerCards';
import InvalidPage from '../InvalidPage/InvalidPage';
import WelcomePanel from '../Dashboard/WelcomePanel';
import LearningModuleAdder from './LearningManagerAdder';
import { useEffect, useState } from "react";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* @return {LearningManagerDashboardPage}
*/
const LearningManagerDashboardPage = () => {
    Axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);

    // Resets reload after it has been triggered
    useEffect(() => {
        setReload(false)
    }, [reload]);

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
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
            Axios.get('http://localhost:3002/api/getQuery',
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

    if (currentUser?.type == 'companyAdmin' || currentUser?.type === 'websiteAdmin') {
        return (
            <>
                <MenuBar></MenuBar>
                <Row className="justify-content-center">
                    <Col xs={11} md={7} lg={7} className="margin_bottom_learning_manager">
                        <WelcomePanel user={currentUser} pageTitle={"Learning Module Manager"} />
                    </Col>
                    <Col xs={11} md={4} lg={4} className="margin_bottom_learning_manager">
                        <LearningModuleAdder companyId={companyId} reload={reload} setReload={setReload} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={11} md={11} lg={11} className="margin_bottom_learning_manager">
                        <LearningManagerCards companyId={companyId} reload={reload} setReload={setReload} />
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
/*
<CardDeck className="LearningManagerDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloLearningManager></HelloLearningManager>
        </CardDeck>
        <LearningManagerCards></LearningManagerCards>
*/

export default LearningManagerDashboardPage;
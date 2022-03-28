import React from 'react';
import './MenuBar.css';
import '../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, CardImg, Card, CardGroup, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from "react";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

/**
 * Creates the MenuBar and selects what buttons to show depending on the page. 
 * @return {Menubar}
 */
const Menubar = () => {
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState('')
    const [company, setCompany] = useState([])
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isCompanyLoading, setCompanyLoading] = useState(true)

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          setSession(response.data.user[0])
          setIsLoggedIn(response.data.loggedIn)
        });
      }, []);

    useEffect(() => {
        if (session.userid != undefined) {
            setLoading(false)
        }
    }, [session])

    // useEffect(() => {

    //     if (isLoggedIn == []) {
    //         console.log("Log out")
    //     }
    // }, [isLoggedIn])

    // Query for getting user's required learning modules
    useEffect(() => {
        if (!isLoading) {
            Axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT CompanyAdmins.CompanyID ' +
                'FROM CompanyAdmins ' +
                'WHERE CompanyAdmins.UserID = ' + String(session.userid)} 
                }).then((response) => {
                    setCompany(Object.values(response.data))
            });
        }
    }, [isLoading])

    useEffect(() => {
        if (company.length != 0) {
            setCompanyLoading(false)
        }
    }, [company])

    useEffect(() => {
        if (!isCompanyLoading) {
            setCompanyId(company[0].CompanyID)
        }
    }, [isCompanyLoading])

    const logout = () => {
        Axios.post("http://localhost:3002/users/logout").then((response) => 
        {
          if (response.data.success === true)
          {
            console.log('LOG OUT SUCCESS')
            navigate('/');
          }
          else if (response.data.success === false)
          {
            console.log(response.data.message)
            console.log('LOG OUT FAILED')
          }
        }).catch(error => console.error(`Error ${error}`));
    };

    /**
     * Returns buttons for accessing employer pages if the user is a company
     * admin
     */
    function get_employer_buttons() {
        let objs = [];
      
        if (!isCompanyLoading && Number.isInteger(companyId)) {
            objs.push(
                <Nav.Item className="navPills uvs-left uvs-right">
                    <Nav.Link className="menubarFont" href="/employer-dash">Employer Dashboard</Nav.Link>
                </Nav.Item>
            )
            objs.push(
                <Nav.Item className="navPills uvs-left uvs-right">
                    <Nav.Link className="menubarFont" href="/learning-manager">Learning Module Manager</Nav.Link>
                </Nav.Item>
            )
        }
        return objs;
    }

    /**
    * Sets the buttons in each MenuBar based on which page the user is on. 
    * @return {GetPage} 
    */

    return (
        <>
        <Row>
            <Col xs={2} md={2}>
                <Card className="logo">
                    <a href="/dash">
                        <CardImg className="MedcurityLogo" variant="top" src="/Medcurity_Logo.png" alt="" />
                    </a>
                </Card>
            </Col>
            <Col xs={10} md={10}>
                <Card className="pillz">
                    <Nav className="justify-content-end" variant="pills" defaultActiveKey="/dashboard">
                        {get_employer_buttons()}
                        <Nav.Item className="navPills uvs-left uvs-right">
                            <Nav.Link className="menubarFont" href="/admin-content">AdminPage</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPills uvs-left uvs-right">
                            <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPills uvs-left uvs-right">
                            <Nav.Link className="menubarFont" href="/" onClick={logout}>Logout</Nav.Link>
                        </Nav.Item>  
                    </Nav>
                </Card>
            </Col>
        </Row>
        </>
    );

}

export default Menubar;


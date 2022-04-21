import React from 'react';
import './MenuBar.css';
import '../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, CardImg, Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";

/**
 * Creates the MenuBar and selects what buttons to show depending on the page. 
 * @return {Menubar}
 */
const Menubar = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState('')
    const [company, setCompany] = useState([])
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isCompanyLoading, setCompanyLoading] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0])
        });
      }, []);

    useEffect(() => {
        if (currentUser.userid !== undefined) {
            setLoading(false)
        }
    }, [currentUser])

    // useEffect(() => {

    //     if (isLoggedIn == []) {
    //         // console.log("Log out")
    //     }
    // }, [isLoggedIn])

    // Query for getting user's required learning modules
    useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
                { params: { the_query: 'SELECT CompanyAdmins.CompanyID ' +
                'FROM CompanyAdmins ' +
                'WHERE CompanyAdmins.UserID = ' + String(currentUser.userid)} 
                }).then((response) => {
                    setCompany(Object.values(response.data))
            });
        }
    }, [isLoading, currentUser.userid])

    useEffect(() => {
        if (company.length !== 0) {
            setCompanyLoading(false)
        }
    }, [company])

    useEffect(() => {
        if (!isCompanyLoading) {
            setCompanyId(company[0].CompanyID)
        }
    }, [isCompanyLoading, company])

    const logout = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/logout`).then((response) => 
        {
          if (response.data.success === true)
          {
            // console.log('LOG OUT SUCCESS')
            navigate('/');
          }
          else if (response.data.success === false)
          {
            // console.log(response.data.message)
            // console.log('LOG OUT FAILED')
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
     * Returns buttons for accessing admin pages if the user is a medcurity
     * admin
     */
      function get_admin_buttons() {
        let objs = [];
        if (currentUser.type == "websiteAdmin") {
            objs.push(
                <Nav.Item className="navPills uvs-left uvs-right">
                    <Nav.Link className="menubarFont" href="/admin-content">Edit Content</Nav.Link>
                </Nav.Item>
            )
            objs.push(
                <Nav.Item className="navPills uvs-left uvs-right">
                    <Nav.Link className="menubarFont" href="/admin-dash">View Employers</Nav.Link>
                </Nav.Item>
            )
        }
        return objs;
    }

    /**
    * Lets the user know the logo is the button to go back to the dash 
    * @param props 
    */
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Back to Main Dash
        </Tooltip>
    );

    /**
    * Sets the buttons in each MenuBar based on which page the user is on. 
    * @return {GetPage} 
    */

    return (
        <>
        <Row>
            <Col xs={2} md={2}>
            <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}>
                <Card className="logo">
                    <a href="/dash">
                        <CardImg className="MedcurityLogo" variant="top" src="/Medcurity_Logo.png" alt="" />
                    </a>
                </Card>
                </OverlayTrigger>
            </Col>
            <Col xs={15} md={10} lg={10}>
                <Card className="pillz">
                    <Nav className="justify-content-end" variant="pills" defaultActiveKey="/dashboard">
                        {get_employer_buttons()}
                        {get_admin_buttons()}
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


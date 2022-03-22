import React from 'react';
import './MenuBar.css';
import '../Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, CardImg, Card, CardGroup } from 'react-bootstrap'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

/**
 * Creates the MenuBar and selects what buttons to show depending on the page. 
 * @return {Menubar}
 */
const Menubar = () => {
    
    const navigate = useNavigate();
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
    * Sets the buttons in each MenuBar based on which page the user is on. 
    * @return {GetPage} 
    */

    return (
        <>
            <CardGroup>
                <Card className="logo">
                    <a href="/dash">
                        <CardImg className="MedcurityLogo" variant="top" src="/Medcurity_Logo.png" alt="" />
                    </a>
                </Card>
                <Card className="pillz">
                    <Nav className="justify-content-end" variant="pills" defaultActiveKey="/dashboard">
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
            </CardGroup>
        </>
    );

}

export default Menubar;


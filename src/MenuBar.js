import React from 'react';
import './MenuBar.css';
import './Layout.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, CardImg, Card, CardGroup } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

/**
 * Creates the MenuBar and selects what buttons to show depending on the page. 
 * @return {Menubar}
 */
const Menubar = () => {

    /**
    * Sets the buttons in each MenuBar based on which page the user is on. 
    * @return {GetPage} 
    */
    const GetPage = () => {
        let location = useLocation();
        switch (location.pathname) {
            case '/settings':
                return (
                    <Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                    </Nav.Item>
                )
            case '/dash':
                return (
                    [<Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                    </Nav.Item>,
                    <Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                    </Nav.Item>]
                )
            case '/quiz/':
                return (
                    [<Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                    </Nav.Item>,
                    <Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                    </Nav.Item>]
                )
            case '/leaderboard':
                return (
                    [<Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                    </Nav.Item>,
                    <Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                    </Nav.Item>]
                )
            case '/learning-module/':
                return (
                    [<Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                    </Nav.Item>,
                    <Nav.Item className="navPills uvs-left uvs-right">
                        <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                    </Nav.Item>])
            default:
                if (location.pathname.includes("/learning-module/")) {
                    for (var i = 0; i < 5; i++) {
                        if (location.pathname.includes(i)) {
                            return (
                                [<Nav.Item className="navPills uvs-left uvs-right">
                                    <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                                </Nav.Item>,
                                <Nav.Item className="navPills uvs-left uvs-right">
                                    <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                                </Nav.Item>])  
                        }
                    }
                }
                else if (location.pathname.includes("/quiz/")) {
                    for (var j = 0; j < 5; j++) {
                        if (location.pathname.includes(j)) {
                            return (
                                [<Nav.Item className="navPills uvs-left uvs-right">
                                    <Nav.Link className="menubarFont" href="/settings">Settings</Nav.Link>
                                </Nav.Item>,
                                <Nav.Item className="navPills uvs-left uvs-right">
                                    <Nav.Link className="menubarFont" href="/">Logout</Nav.Link>
                                </Nav.Item>])  
                        }
                    }
                }
                return null;
        }
    }

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
                        <GetPage></GetPage>
                    </Nav>
                </Card>
            </CardGroup>
        </>
    );

}

export default Menubar;


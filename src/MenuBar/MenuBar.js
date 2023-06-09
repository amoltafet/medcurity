import React from 'react';
import './MenuBar.css';
import '../Layout.css'
import { Nav, Tooltip, Navbar, NavDropdown } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Notifications from './Notifications/Notifications'
import Badge from '@material-ui/core/Badge';
import Search from './Search/Search'
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import { Button } from '@mui/material';
// import env from "react-dotenv";


/**
 * Creates the MenuBar and selects what buttons to show depending on the page. 
 * @return {Menubar}
 */
const Menubar = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState('')
    const [company, setCompany] = useState([])
    const [companyLinkID, setCompanyLinkID] = useState('');
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isCompanyLoading, setCompanyLoading] = useState(true)
    const [notifs, setNotifs] = useState([]);
    const [unreadNotifs, setunreadNotifs] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);

   
    const goBack = () => {
        window.history.back();
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0])
        }).catch((error) => console.log(error));
      }, []);

    useEffect(() => {
        // function used to pull in notifications for that user
        async function getNotifications() {
            let userNotifs = (await axios.get(`${process.env.REACT_APP_BASE_URL}/users/notifications`, { params: { userid: currentUser.userid }})
                .catch(error => console.error(`Error ${error}`)));
            userNotifs = userNotifs.data;
            
            if (userNotifs.success) {
                userNotifs = userNotifs.result;
                if (userNotifs.length !== 0) {
                  if (!userNotifs[0].seen) {
                    setunreadNotifs(true)
                  }
                }
                setNotifs(userNotifs);
            }
        }
    
        if (currentUser.userid) {
            getNotifications();
        }
    },[currentUser, isLoading]);

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

  // setting company information 
  useEffect(() => {
    if (currentUser.userid) {
      if (currentUser.type === "user" || currentUser.type === "websiteAdmin") {
        setCompanyLinkID(currentUser.companyid);
      }
      else if (currentUser.type === "companyAdmin") {
        setCompanyLinkID(currentUser.companyAdminID);
      }
    }
  }, [currentUser]);

    const markRead = () => {
      setunreadNotifs(false);

      axios.post(`${process.env.REACT_APP_BASE_URL}/users/readNotifications`, 
        {userid: currentUser.userid}).then((response) => 
      {
        console.log("Notifications marked as read");
      }).catch(error => console.error(`Error ${error}`));
    }

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
     
    function get_employer_buttons() {
        let objs = [];
      
        if (!isCompanyLoading && Number.isInteger(companyId)) {
            objs.push(
              <>
                <li class="nav-item text-center mx-2 mx-lg-1">
                <a class="nav-link" href="/employer-dash">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data" viewBox="0 0 16 16">
                  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                  <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                  <path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"/>
                  </svg>
                  </div>
                  Dashboard
                </a>
              </li>
              </>
            )
            objs.push(
              <>
                <li class="nav-item text-center mx-2 mx-lg-1">
                <a class="nav-link" href="//learning-manager">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data" viewBox="0 0 16 16">
                  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                  <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                  <path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"/>
                  </svg>
                  </div>
                  Learning Module Manager
                </a>
              </li>
              </>
            )
        }
        return objs;
    }
    */
     /**
     * Returns buttons for accessing admin pages if the user is a medcurity
     * admin
     
      function get_admin_buttons() {
        let objs = [];
        if (currentUser.type === "websiteAdmin") {
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
    */
    /**
    * Lets the user know the logo is the button to go back to the dash 
    * @param props 
    */
    const renderTooltip = () => {
      //gratb url and split it to get the page name
      const url = window.location.href;
      const page = url.split("/")[3];
      //if the page is charts or dashboard, show the tooltip
      if (page === "charts" || page === "quiz") {
      return (
          <Button variant="contained" onClick={() => goBack()}>
          Go Back
        </Button>
      
    ) } else {
      return (
        <></>)
      }
    }

    /**
    * Sets the buttons in each MenuBar based on which page the user is on. 
    * @return {GetPage} 
    */

    return (
       <>
<nav class="navbar navbar-expand-lg navbar-color">
  <div class="container-fluid">
      
      
        {renderTooltip()}

    

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      

      <ul class="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
       
        <li class="nav-item text-center mx-2 mx-lg-1">
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
          
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={unreadNotifs ? 
              <Badge color="secondary" variant="dot">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
                </svg>
              </Badge>
               : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>}
              menuVariant="dark"
              size="lg"
              bsStyle="dark"
              noCaret={true}
              onClick={markRead}
              
            >
              <Notifications userNotifs={notifs}/>
             
            </NavDropdown>
          
          </Nav>
        </Navbar.Collapse>
        </li>
       
       
         <li class="nav-item text-center mx-1 mx-lg-1">
        
        <Navbar.Toggle aria-controls="navbar-dark-example" class="toggle"/>
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
              </svg>}
              menuVariant="dark"
              size="lg"
              bsStyle="dark"
              noCaret={true}
            >
              <NavDropdown.Item href="/settings">Profile</NavDropdown.Item>
              <NavDropdown.Item href={"/company/" + companyLinkID}>Company</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </li>

        <div style={{
           marginTop: "5px"
        }}>
           <Search />
        </div>
         
        
      </ul>

      

    </div>
    
  </div>
</nav>
     
        </>
    );

}




export default Menubar;


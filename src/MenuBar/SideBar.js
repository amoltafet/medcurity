import React from 'react';
import './MenuBar.css';
import '../Layout.css'
import { CardImg} from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Typography } from '@material-ui/core';
import { Button, Paper } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState('')
    const [company, setCompany] = useState([])
    const [companyLinkID, setCompanyLinkID] = useState('');
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isCompanyLoading, setCompanyLoading] = useState(true)
    const [currentNav, setCurrentNav] = useState('home');
    const [isSideBarOpen, setSideBarOpen] = useState(false);
   
    
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0])
        }).catch((error) => console.log(error));
      }, []);



    useEffect(() => {
        if (currentUser.userid !== undefined) {
            setLoading(false)
        }
    }, [currentUser])


    useEffect(() => {
        // grab href from url
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlEnd = urlArray[urlArray.length - 1];
        // if url ends with nav link then set active
        setCurrentNav('/' + urlEnd)
    }, [])

        
    const logout = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/logout`).then((response) => {
            navigate('/')
        }).catch((error) => console.log(error));
    }


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

  

    const userNav = [
        { name: 'Home', link: '/dash', icon: 'bi bi-house-door' },
        { name: 'Leaderboard', link: '/leaderboard', icon: 'bi bi-align-start' },
        { name: 'Modules', link: '/learning-directory', icon: 'bi bi-book' },
    ]

    const companyNav = [
        { name: 'Company Dash', link: '/employer-dash', icon: 'bi bi-buildings' },
        { name: 'Manager', link: '/learning-manager', icon: 'bi bi-clipboard-check' },
        { name: 'Statistics', link: '/charts', icon: 'bi bi-clipboard-data' },
    ]

    const adminNav = [
        { name: 'Edit Modules', link: '/admin-content', icon: 'bi bi-pencil-square' },
        { name: 'Manage Employers', link: '/admin-dash', icon: 'bi bi-clipboard-check' }
    ]

    const toggleSidebar = () => {
        setSideBarOpen(!isSideBarOpen);
    };



    return (
        <>
         <Sidebar defaultCollapsed={isSideBarOpen} >
            <Menu>
                <MenuItem onClick={toggleSidebar} sx={{
                    // no hover
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },

                }}>
                    
                            {isSideBarOpen ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
                </MenuItem>
            <MenuItem style={{
                marginBottom: '4%',
            }}>
        <a href="/dash"> 
        
        <CardImg className="" variant="top" src="/Medcurity_Logo.png" alt="" /> 
        
        </a>
        </MenuItem>
            {userNav.map((item, index) => {
                    return (
                        <MenuItem key={index}  onClick={() => navigate(item.link)} id={item.name.toLowerCase()} style={{
                            // if active then change color
                            border: item.link === currentNav ? '1px solid #4535F5' : '1px solid #E5E5E5',
                          
                        }}>
                           
                            <ListItemIcon>
                            <i className={item.icon} style={{
                                // if active then change color
                                color: item.link === currentNav ? '#4535F5' : 'black',
                            }}></i>
                            </ListItemIcon>
                          {item.name} 
                       



                            </MenuItem>
                        

                )
            })}
       
        {!isCompanyLoading && Number.isInteger(companyId) ? 
          <>
          {isSideBarOpen ? 
          null : <Typography variant="overline" display="block" gutterBottom style={{
            marginLeft: '1rem',
            marginTop: '1rem',
        }}>
            Company Tools
        </Typography>}
            <List>
            {companyNav.map((item, index) => {
                    return (
                        <MenuItem key={index}  onClick={() => navigate(item.link)} id={item.name.toLowerCase()} style={{
                            // if active then change color
                            border: item.link === currentNav ? '1px solid #4535F5' : '1px solid #E5E5E5',
                            
                        }}>
                           
                            <ListItemIcon>
                            <i className={item.icon} style={{
                                // if active then change color
                                color: item.link === currentNav ? '#4535F5' : 'black',
                            }}></i>
                            </ListItemIcon>
                          {item.name} 
                       



                            </MenuItem>
                )
            })}
        </List> 
        
              
        </>
              : null}
  <Divider />
        {currentUser.type === "websiteAdmin"? 
        <>
        {isSideBarOpen ? null :
        <Typography variant="overline" display="block" gutterBottom style={{
            marginLeft: '1rem',
            marginTop: '1rem',
        }}>
            Admin Tools
        </Typography>
        }
        <List>
            {adminNav.map((item, index) => {
                    return (
                        <MenuItem key={index}  onClick={() => navigate(item.link)} id={item.name.toLowerCase()} style={{
                            // if active then change color
                            border: item.link === currentNav ? '1px solid #4535F5' : '1px solid #E5E5E5',
                            
                        }}>
                           
                            <ListItemIcon>
                            <i className={item.icon} style={{
                                // if active then change color
                                color: item.link === currentNav ? '#4535F5' : 'black',
                            }}></i>
                            </ListItemIcon>
                          {item.name} 
                       


                            </MenuItem>
                )
            })}
        </List> 
       
        </>
        : null}
            <MenuItem onClick={() => { 
                logout();
                navigate('/login');
            }} style={{
                marginTop: '100%',
                marginBottom: '1rem',
                border: '1px solid #E5E5E5',

                
            }}>
                <ListItemIcon>
                    <i className="bi bi-box-arrow-right"></i>
                </ListItemIcon>
                Logout
            </MenuItem>
       
        </Menu>
        </Sidebar>
        </>
    );

}



export default SideBar;


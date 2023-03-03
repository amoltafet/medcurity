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

    const logout = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/logout`).then((response) => 
        {
          if (response.data.success === true)
          {
            navigate('/');
          }
          else if (response.data.success === false)
          {

          }
        }).catch(error => console.error(`Error ${error}`));
    };

    const userNav = [
        { name: 'Home', link: '/dash#!', icon: 'bi bi-house-door' },
        { name: 'Leaderboard', link: '/leaderboard', icon: 'bi bi-align-start' },
        { name: 'Modules', link: '/learning-directory', icon: 'bi bi-book' },
    ]

    const companyNav = [
        { name: 'Company Dashboard', link: '/employer-dash', icon: 'bi bi-buildings' },
        { name: 'Module Manager', link: '/learning-manager', icon: 'bi bi-clipboard-check' },
        { name: 'Statistics', link: '/charts', icon: 'bi bi-clipboard-data' },
    ]

    const adminNav = [
        { name: 'Edit Modules', link: '/admin-content', icon: 'bi bi-pencil-square' },
        { name: 'Manage Employees', link: '/admin-dash', icon: 'bi bi-clipboard-check' },
        { name: 'Send Message', link: '/', icon: 'bi bi-chat-right-dots' },
    ]

    return (
       <div style={{
        position: 'sticky',
        top: '0',
       }}>
       <a href="/dash">
                <CardImg className="MedcurityLogo mr-5" variant="top" src="/Medcurity_Logo.png" alt="" />
        </a>
        <div style={{
            marginTop: '3rem',
        }}></div>
        <Divider />
        <List>
            {userNav.map((item, index) => {
                    return (
                            <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => navigate(item.link)} id={item.name.toLowerCase()} className="" style={{
                                // if active then change color
                                color: item.link === currentNav ? '#3f51b5' : 'black',
                            }}>
                            <ListItemIcon>
                            <i className={item.icon} style={{
                                // if active then change color
                                color: item.link === currentNav ? '#3f51b5' : 'black',

                            }}></i>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            </ListItemButton>
                        
                        </ListItem>
                )
            })}
        </List> 
        <Divider />
       
        {!isCompanyLoading && Number.isInteger(companyId) ? 
          <>
           <Typography variant="overline" display="block" gutterBottom style={{
            marginLeft: '1rem',
            marginTop: '1rem',
        }}>
            Company Tools
        </Typography>
            <List>
            {companyNav.map((item, index) => {
                    return (
                            <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => navigate(item.link)}>
                            <ListItemIcon>
                            <i className={item.icon}></i>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            </ListItemButton>
                        
                        </ListItem>
                )
            })}
        </List> 
        
              
        </>
              : null}
  <Divider />
        {currentUser.type === "websiteAdmin"? 
        <>
 <Typography variant="overline" display="block" gutterBottom style={{
            marginLeft: '1rem',
            marginTop: '1rem',
        }}>
            Admin Tools
        </Typography>
        <List>
            {adminNav.map((item, index) => {
                    return (
                            <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => navigate(item.link)}>
                            <ListItemIcon>
                            <i className={item.icon}></i>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            </ListItemButton>
                        
                        </ListItem>
                )
            })}
        </List> 
       
        </>
        : null}

    


      
       
     
        </div>
    );

}




export default SideBar;


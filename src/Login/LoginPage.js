import {Image, Form} from 'react-bootstrap'
import Button from '@mui/material/Button';
import React from 'react';
import { useState, useEffect} from "react";
import axios from "axios"
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';

// import env from "react-dotenv";

/**
* Creates and displays the main login page. 
* @return {LoginPage}
*/

export default function LoginPage()
{
  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileView, setMobileView] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight + 10,
    width: window.innerWidth
  });
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
  
    setValue(newValue);

  };

//// console.log("FROM LOGIN PAGE:", process.env.REACT_APP_BASE_URL)
  
  // get the user's session to see if they're already logged in. If so,
  // redirect them to their dashboard...
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
      if (response.data.user)
      {
        setCurrentUser(response.data.user[0])
      }
      else
      {
        setCurrentUser(null)
      }
    }).catch(error => console.error(`Error ${error}`)); }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
  },[])

  const login = () => {    

    if (email.length > 0 || password.length > 0)
    {
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email: email, password: password }).then((response) => 
      {
        if (response.data.success === true)
        {
          setMessage(response.data.message)
          navigate('/dash');
        }
        else if (response.data.success === false)
        {
          setMessage(response.data.message)
        }
      }).catch(error => console.error(`Error ${error}`));
    }
    else
    {
      let loginMessage = ""
      if (email <= 0) loginMessage += "Email required. "
      if (password <= 0) loginMessage += "Password required. "
      setMessage(loginMessage)
    };
  }

  const register = () => {
    navigate('/register');
  };

  const dashRedirect = () => {
    navigate('/dash');
  };
 
  if (mobileView) {
    return 
  }
 
  if (!currentUser)
  {
    return (

     
      <Grid container spacing={2} sx={{
        height: dimensions.height,
        width: dimensions.width,
  
      }}>
        <Grid item xs={8} sx={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2c3e50',
          color: '#fffffff',
        }}>
        <Image className="MedcurityLogo_login justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
            <div className="login_pageHeader">
              <Typography variant="h2" component="div" gutterBottom color="#ffffff">
                Welcome To Medcurity Learn!
              </Typography>
            </div>
            <div className="login_pageHeader">
              <Typography variant="h5" component="div" gutterBottom color="#ffffff">
              Protect your organization and your patients’ information.
              </Typography>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Icons />
            </div>
            <div className="login_pageHeader" style={{
              margin: '5%',
            }}>
              <Typography variant="h6" component="div" gutterBottom color="#ffffff">
              Medcurity Learn is a HIPAA compliance training platform that provides a comprehensive and engaging learning experience for your organization.
              </Typography>
            </div>

        </Grid>

        <Grid item xs={4} sx={{
          backgroundColor: '#ffffff',
          color: '#2c3e50',
        }}>
      
        <Box sx={{ width: '100%', justifyContent : 'center', }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            sx={{
              color: '#2c3e50',
              marginTop: '25%',
            }}
            centered
          >
              <Tab label="Log In"  sx={{color : '#2c3e50',
              backgroundColor: '#ffffff'}}/>
              <Tab label="Create an Account" sx={{color : '#2c3e50',
              backgroundColor: '#ffffff'}}/>
          </Tabs>
          <TabPanel value={value} index={0}>
          <div style={{
            marginTop: '10%',
          }}>
                <div className="row justify-content-center">
                  <h3 className="login_h3">Login to your account.</h3>
                  <p className="login_p">To access your Medcurity Learn Security Dashboard, please enter your login credentials.</p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                  }} >
                  <TextField id="formEmail" label="Email" variant="outlined" onChange={ (e) => {setEmail(e.target.value); }} sx=
                  {{
                    width: '80%',
                    marginBottom: '3%',
            
                  }}
                  color="primary" />
         
                
                    
                  <TextField id="formPassword" label="Password" variant="outlined" onChange={ (e) => {setPassword(e.target.value); }} sx=
                  {{
                    width: '80%',
                    marginBottom: '3%',
                  }}/>
                  <p className="login_loginResponse">{message}</p>
                  
                  
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                  }} >
                  <Button onClick={login} variant="outlined" >Login with Existing Account</Button>    
                  <Button  href="/resetPassword" variant="text" sx={{
                    
                  }}
                    >Forgot password?</Button>
                  </div>
                
                </div>
              </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <div style={{
                marginTop: '10%',
              }}>
               <div class="row justify-content-center">
                  <h3 class="login_h3"><strong>Need an account?</strong> Got an invitation?</h3>
                  <p class="login_p">Creating a new account is quick and easy. Get started here!</p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }} >
                  <Button onClick={register} variant="outlined" >Register a New Account</Button>
                  </div>
                </div>
              </div>
            
          </TabPanel>
    </Box>
        </Grid>


      </Grid>

  );
  }
  else
  {
    return (
      <>
        <body onLoad={dashRedirect()}>
          <p>Redirecting...</p>
        </body>
      </>
    )

  }
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Icons() {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '15%',
      }}>
        <HealthAndSafetyOutlinedIcon  style={{
          width: '100px',
          height: '100px',
          color: '#ffffff',
          margin: '1%',
        }}/>
        <SpaOutlinedIcon style={{
          width: '100px',
          height: '100px',
          color: '#ffffff',
          margin: '1%',
        }} />
        <CloudSyncOutlinedIcon style={{
          width: '100px',
          height: '100px',
          color: '#ffffff',
          margin: '1%',
        }}/>

      </div>
    
    </>
  );
}
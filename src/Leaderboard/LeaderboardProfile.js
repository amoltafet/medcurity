import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card, Image, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import './LeaderboardProfile.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import env from "react-dotenv";

/**
* Creates and displays each users leaderboard profile. 
* @param {Array} className the css style to display. 
* @param {user} user the user grabed from the dashboard.
* @return {GetPage}
*/
function LeaderboardProfile (props) {
    const [directories, setDirectories] = useState([]);
    axios.defaults.withCredentials = true;
    const [currentUser, setCurrentUser] = useState([]);
    const [profilePic, setProfilePic] = useState("")

   /**
    * grabs current user.  
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
          setCurrentUser(response.data.user[0]); 
        }).catch(error => console.error(`Error ${error}`));
      }, []);
    /**
    * Creates and displays each users leaderboard profile. 
    * @param {Array} className the css style to display. 
    * @param {user} user the user grabed from the dashboard.
    * @return {GetPage}
    */

   /**
    * grabs users assigned modules info.  
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: 
            `SELECT AffiliatedUsers.UserID, CompanyLearningModules.CompanyID, CompletedModules.Points, CompletedModules.Percentage, LearningModules.Title ` +
            `FROM AffiliatedUsers JOIN CompanyLearningModules ` +
        `ON AffiliatedUsers.CompanyID = CompanyLearningModules.CompanyID ` +
        `JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ` +
        `LEFT JOIN CompletedModules ON (CompletedModules.LearningModID = CompanyLearningModules.LearningModID ` +
        `and CompletedModules.UserID = AffiliatedUsers.UserID) ` +
        `WHERE AffiliatedUsers.UserID = '${props.userid}'`
        // `SELECT * ` +
        // `FROM AffiliatedUsers JOIN CompanyLearningModules ` +
        // `ON AffiliatedUsers.CompanyID = CompanyLearningModules.CompanyID ` +
        // `JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ` +
        // `JOIN UserPoints ON UserPoints.PointsID = CompanyLearningModules.LearningModID ` +
        // `LEFT JOIN CompletedModules ON UserPoints.PointsID = CompletedModules.LearningModID ` +
        // `WHERE AffiliatedUsers.UserID = '${currentUser.userid}'`
        // `SELECT * ` +
        // `FROM AffiliatedUsers  ` +
        // `JOIN CompletedModules ON AffiliatedUsers.UserID = CompletedModules.UserID ` +
        // `JOIN LearningModules ON LearningModules.ID = CompletedModules.LearningModID ` +
        // `WHERE AffiliatedUsers.UserID = '${currentUser.userid}'` 
        } }).then((response) => {
            console.log(response.data)
            setDirectories(Object.values(response.data));
            if (response.data.length === 0) {
                setDirectories(null)
            }
        }).catch(error => console.error(`Error ${error}`));  
    }, [currentUser])

    useEffect(() => { 
        if (props.userid) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getProfilePicture`, { params: { id: props.userid }} ).then((response) => { 
                setProfilePic(response.data.profileImage) 
            }); 
        }
    }, [])

    const GetCurrentModule = () => {
        var categoryData = []
        if (directories !== null) {
            for (var i = 0; i < directories.length; i++) {
                categoryData.push( 
                    <Grid item xs={12} sm={6} md={4}  alignItems="center" sx={{
                        textAlign: 'center',
                    }}>
                    <Typography variant="overline" display="block" style={{
                    }}>
                        {directories[i].Title}
                    </Typography>
                    <Grid item xs={12}  alignItems="center">
                    <CircularProgressWithLabel value={directories[i].Percentage * 100} />
                    </Grid>
                </Grid>
                )
            } 
            return (categoryData)
        }
    }




    if (props.name === currentUser.username) {
        let imageClassname = props.className ? props.className[1] : "";

        return (
            <div>    
            <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                       
                    }}>
                <ListItem style={{
                    border: '2px solid #000000',
                }}>
                        
                <ListItemAvatar>
                        <Avatar src={`data:image/png;base64,${profilePic}`}  alt=""/>
                        </ListItemAvatar>
                        <ListItemText
                        primary={props.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {props.score} points
                            </Typography>
                          
                            </React.Fragment>
                        }
                        />
                        

                        <Grid container spacing={5}>
                            {GetCurrentModule()}
                            {directories === null ? <Typography variant="overline" display="block" style={{
                                textAlign: 'center',
                                width: '100%',
                            }}>
                                No Modules Assigned
                            </Typography> : null
                            
                            }

                        </Grid>      
                    </ListItem>    </div>
                    <Divider />
            </div>
        );
    }
    else {
        let imageClassname = props.className ? props.className[1] : "";

        return (
            <div>
        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        
                    }}>
                <ListItem >
            <ListItemAvatar>
          <Avatar  src={`data:image/png;base64,${profilePic}`}  alt=""/>
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.score} points
              </Typography>
             
            </React.Fragment>
          }
        />
          <Grid container spacing={5}>
                            
                            {GetCurrentModule()}  
                            {directories === null ? <Typography variant="overline" display="block" style={{
                                textAlign: 'center',
                                width: '100%',
                                marginRight: '50px',
                            }}>
                                No Modules Assigned
                            </Typography> : null
                            }
                        </Grid>      
                    </ListItem>   </div>
                    <Divider />
            </div>
        );
    }
}

function CircularProgressWithLabel(props) {
    return (
        
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {props.value === 0 ? <CircularProgress variant="determinate" value={100} style={{
            color: "red"
        }} /> : <CircularProgress variant="determinate" {...props} />}
       
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            
           
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}`}
          </Typography>
        </Box>
      </Box>

    );
  }
  
  CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
 

export default LeaderboardProfile;
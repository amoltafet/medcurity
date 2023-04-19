import React from 'react';
import Menubar from '../MenuBar/MenuBar';
import LeaderboardProfile from './LeaderboardProfile';
import InvalidPage from '../InvalidPage/InvalidPage';
import { Card, Col, Row, Tab, Nav } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import './Leaderboard.css';
import Tabs from '@mui/material/Tabs';
import MUITab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SideBar from '../MenuBar/SideBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import env from "react-dotenv";

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

/**
* Creates the main container for the leaderboard. 
* @return {LeaderboardPage}
*/
const LeaderboardPage = () => {
    axios.defaults.withCredentials = true;
    const [allUsers, setAllUsers] = useState([]);
    const [company, setCompany] = useState("Company");
    const [companyUsers, setCompanyUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    /**
    * grabs current user.  
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
            setCurrentUser(response.data.user[0])
            // // console.log("userId:", response.data.user[0].companyid)
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    /**
    * Grabs all of the user data for leaderboard. 
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/stats/getLeaderboard`, {
        }).then((response) => {
            console.log(response.data);
            if (response.data.success) {
                let data = response.data.result;
                data.forEach(element => {
                    if (element.Points === null) {
                        element.Points = 0;
                    }
                });
                setAllUsers(Object.values(data));
                }
            else {
                console.error(`Error ${response.data.error}`);
            }
        }).catch(error => console.error(`Error ${error}`));
    }, [])

    //Grab the total points for the company based on the current user's company id

   /**
   * Grabs company users, grabs the employees if user is a company admin. 
   */
    useEffect(() => {
        if (currentUser.type === "companyAdmin") {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
                params: {
                    the_query:
                        'SELECT Users.userid, Users.username, Users.companyid, SUM(Points) AS Points FROM CompletedModules ' +
                        'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                        'JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid WHERE AffiliatedUsers.CompanyID = ' + currentUser.companyAdminID + ' ' +
                        'GROUP BY Users.userid '
                }
            }).then((response) => {
                response.data.forEach(element => {
                    if (element.Points === null) {
                        element.Points = 0;
                    }
                });
                setCompanyUsers(Object.values(response.data));
            }).catch(error => console.error(`Error ${error}`));
        }
        else {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
                params: {
                    the_query:
                        'SELECT Users.userid, Users.username, Users.companyid, SUM(Points) AS Points FROM CompletedModules ' +
                        'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' +
                        'JOIN AffiliatedUsers ON AffiliatedUsers.UserID = Users.userid WHERE AffiliatedUsers.CompanyID = ' + currentUser.companyid + ' ' +
                        'GROUP BY Users.userid '
                }
            }).then((response) => {
                response.data.forEach(element => {
                    if (element.Points === null) {
                        element.Points = 0;
                    }
                });
                setCompanyUsers(Object.values(response.data));
            }).catch(error => console.error(`Error ${error}`));
        }
    }, [currentUser])

    /**
    * Grabs company name. 
    */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
            params: {
                the_query:
                    'SELECT * FROM Companies WHERE companyid = ' + currentUser.companyid
            }
        }).then((response) => {
            setCompany(Object.values(response.data[0].name))
        }).catch(error => console.error(`Error ${error}`));



    }, [currentUser])



    // classes for the accordian
    var className = [
        "userPanel",
        "userProfile",
        "category",
        "progressBar",
        "companiesPanel",
    ];

    /**
    * Sorts the users by points 
    */
    function sortUsers() {
        if (allUsers !== undefined) {
            function sorter(a, b) {
                return b.Points - a.Points;
            }

            allUsers.sort(sorter);
        }
    }

    /**
    * Sorts the company users by points 
    */
    function sortCompanyUsers() {
        if (companyUsers !== undefined) {
            function sorter(a, b) {
                return b.Points - a.Points;
            }
            companyUsers.sort(sorter);
        }
    }



    /**
    * Maps each user out to their leaderboard profile. 
    */
    sortUsers()
    var index = 0;
    const AllUsersProfileArray = allUsers.map((userProfile) => {

        index++;
        return (
            <div style={{
                marginLeft: '70px',
                marginRight: '70px',
            }}>
            <LeaderboardProfile
                userid={userProfile.userid}
                name={userProfile.username}
                index={index}
                className={className}
                userColor={className[4]}
                companyColor={className[0]}
                score={userProfile.Points} />
    </div>
        );
    })

    /**
    * Sorts the users by points 
    */
    var company_index = 0;
    sortCompanyUsers();
    const CompanyUsersProfileArray = companyUsers.map((userProfile) => {
        company_index++;
        return (
      
            <div style={{
                marginLeft: '70px',
                marginRight: '70px',
            }}>
            <LeaderboardProfile
                userid={userProfile.userid}
                name={userProfile.username}
                index={company_index}
                className={className}
                userColor={className[0]}
                companyColor={className[4]}
                score={userProfile.Points}
                
                />
            </div>
        );
    })

    const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

    if (currentUser?.userid) {
        return (
            <Grid container>
        <Grid item >
            <SideBar />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
        <Menubar/>
       
             
                <div >
                    <Box>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: '#2c3e50', fontSize: '2.5rem', paddingTop: '1rem' }}>
                     Leaderboards
                    </Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <MUITab label='Company' />
                        <MUITab label='All Users' />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div style={{
                            maxHeight: 600, 
                            overflow: 'auto',
                        }}>
                    {CompanyUsersProfileArray}
                    </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div style={{
                            maxHeight: 600, 
                            overflow: 'auto',
                            scrollbarColor: 'red',
                        }}>
                    {AllUsersProfileArray}</div>
                    </TabPanel>
                </Box> </div>
            </Grid>
        </Grid>

        );
    }
    else {
        return (
            <>
                <InvalidPage
                    redirectPage={'/'}
                    reason={"You need to be logged in to view the leaderboard."}
                    btnMessage={"Back to Login Page"}>
                </InvalidPage>
            </>
        )
    }
}




export default LeaderboardPage
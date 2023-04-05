import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import {TableRow, TableCell} from '@mui/material';
import Button from '@mui/material/Button';
// import env from "react-dotenv";

/**
 * Panel for Module cards
 * @param {int} userId 
 * @param {int} companyId
 * @param {str} email
 * @param {str} name
 * @param {str} progress
 * @param {bool} activeStatus
 * @returns 
 */
const EmployeeCard = (props) => {
    axios.defaults.withCredentials = true;
    const [message, setMessage] = useState('');
    const [lastActivity, setLastActivity] = useState('');

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     * @param {int} companyId
     */
    function removeUser(userId, companyId) {
        // console.log("Removing user from company");
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/deleteUser`, {
            userid: userId,
        }).then((response) => {
            // console.log("response.data =", response.data)
            if (response.data === true)
            {
                // console.log("Deleted!")
                props.setReload(true)
            }
            else if (response.data === false)
            {
                // console.log("Already deleted!")
                setMessage('This user has already been removed. Please Refresh the page.')
            }
        });
    }

    useEffect(() => {
        if (props.name) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/users/recentActivity`, {params: {userid: props.userId}}).then((response) => {
                let userActivity = response.data;
                if (userActivity.length > 0) {
                    let userDate = new Date(userActivity[0].date);
                    let month = userDate.getUTCMonth() + 1; //months from 1-12
                    let day = userDate.getUTCDate();
                    let year = userDate.getUTCFullYear();
                    let dateString = month + "/" + day + "/" + year;
                    setLastActivity(dateString);
                    return;
                }
            });
            setLastActivity("NA");
        }
    }, []);

    const activated = props.activeStatus ? "Active" : "Inactive";
const email = props.email;
const name = props.name;
const progress = props.progress;
const userId = props.userId;
const companyId = props.companyId;
 // { emprops.emailail, name, activated, activity, progress, remove };
    return (
    
         <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{props.email}</TableCell>
            <TableCell align="right">{props.name}</TableCell>
            <TableCell align="right">{activated}</TableCell>
            <TableCell align="right">{lastActivity}</TableCell>
            <TableCell align="right">{progress}</TableCell>
            <TableCell align="right">
                <OverlayTrigger trigger="click" rootClose placement="bottom" 
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Content>
                   
                                <div>Please confirm that you want to delete the user '{props.name}': </div> 
                                <div>{message}</div>
                   
                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2, mb: 1 }}
                                    fullWidth
                                    onClick={() => removeUser(props.userId, props.companyId)}> 
                                    Confirm 
                                </Button>
                        </Popover.Content>
                    </Popover>
                }>
        
        <Button variant="outlined">
                    Remove</Button>
                </OverlayTrigger>
            </TableCell>
          </TableRow>

        
    );
}


// 

   



export default EmployeeCard;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import axios from 'axios';
// import env from "react-dotenv";
import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

/**
 * A card containing a button for resetting user stats
 * @param {int} companyId 
 * @returns 
 */
const EmployeeResetUsersStats = (props) => {

    /**
     * Resets the points and module completed progress for all users
     */
    function resetUsers() {
        // console.log("Resetting all user progress");
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/resetUserStats`, {
            companyId: props.companyId
        }).then((response) => {
            // // console.log("response.data =", response.data)
            if (response.data === true)
            {
                // // console.log("Deleted!")
                props.setReload(true)
            }
            // else if (response.data === false)
            // {
            //     // console.log("Failed to reload")
            // }
        });
    }

 
    return (
        <>
        <Grid2 container sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
        }}>
            <Typography variant="h6" gutterBottom>
                    Reset All Users 
            </Typography>
            <OverlayTrigger trigger="click" rootClose placement="bottom" 
            overlay={
                <Popover id="popover-basic">
                    <Popover.Content>
                        <Row>
                            <div>This step will reset all employee progress and leaderboard points. 
                                Please confirm you wish to reset all users: </div> 
                        </Row>
                        <Row>
                            <Button className="EmployeeInRowButton_confirm uvs-right" 
                                variant="success" 
                                onClick={() => resetUsers()}> 
                                Confirm 
                            </Button>
                        </Row>
                    </Popover.Content>
                </Popover>
            }>
    
                <Button className="uvs-right EmployeeInRowButton_reset text-center" 
                size="lg" 
                variant="danger"> 
                Reset</Button>
            </OverlayTrigger>
            </Grid2>
      
        </>
    );
}

export default EmployeeResetUsersStats;
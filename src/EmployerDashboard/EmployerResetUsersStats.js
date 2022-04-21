import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import { useEffect, useState} from "react";
import axios from 'axios';

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
        console.log("Resetting all user progress");
        axios.post("http://localhost:3002/users/resetUserStats", {
            companyId: props.companyId
        }).then((response) => {
            console.log("response.data =", response.data)
            if (response.data === true)
            {
                console.log("Deleted!")
                props.setReload(true)
            }
            else if (response.data === false)
            {
                console.log("Failed to reload")
            }
        });
    }

 
    return (
        <>
        <Card className="EmployeeCard_dash uvs-right uvs-left justify-content-center" style={{ flexDirection: 'row' }}>
            <Card.Title className="employee_remove_card_header"><b>Reset All Users:     </b></Card.Title>
           
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
    
                <Button className="uvs-right" 
                size="lg" 
                variant="danger"> 
                Reset</Button>
            </OverlayTrigger>
        </Card>

        </>
    );
}

export default EmployeeResetUsersStats;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import { useState, useEffect } from "react";
import axios from 'axios';
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
 
    return (
        <>
        <Card className="EmployeeCard_dash uvs-right uvs-left justify-content-center" style={{ flexDirection: 'row' }}>
            <Col xs={2} md={2} lg={2}>
                <div className="EmployeeCardValues">{props.email}</div>
            </Col>
            <Col xs={3} md={2} lg={2}>
                <div className="EmployeeCardValues text-center">{props.name}</div>
            </Col>
            <Col xs={2} md={2} lg={2}>
                <div className="EmployeeCardValues text-center">{String(Boolean(props.activeStatus))}</div>
            </Col>
            <Col xs={2} md={2} lg={2}>
                <div className="EmployeeCardValues text-center">{lastActivity}</div>
            </Col>
            <Col xs={2} md={2} lg={2}>
                <div className="EmployeeCardValues text-center">{props.progress}</div>
            </Col>
            <Col xs={2} md={2} lg={2} className="text-center">
                <OverlayTrigger trigger="click" rootClose placement="bottom" 
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Content>
                   
                                <div>Please confirm that you want to delete the user '{props.name}': </div> 
                                <div>{message}</div>
                   
                                <Button className="EmployeeInRowButton_confirm uvs-right justify-content-center" 
                                    variant="success" 
                                    onClick={() => removeUser(props.userId, props.companyId)}> 
                                    Confirm 
                                </Button>
                        </Popover.Content>
                    </Popover>
                }>
        
                    <Button className="uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove</Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default EmployeeCard;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import { useState} from "react";
import axios from 'axios';
import env from "react-dotenv";

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
    const [message, setMessage] = useState('');

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     * @param {int} companyId
     */
    function removeUser(userId, companyId) {
        console.log("Removing user from company");
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/deleteUser`, {
            userid: userId,
        }).then((response) => {
            console.log("response.data =", response.data)
            if (response.data === true)
            {
                console.log("Deleted!")
                props.setReload(true)
            }
            else if (response.data === false)
            {
                console.log("Already deleted!")
                setMessage('This user has already been removed. Please Refresh the page.')
            }
        });
    }

 
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
                <div className="EmployeeCardValues text-center">{props.progress}</div>
            </Col>
            <Col xs={2} md={2} lg={2}>
                <OverlayTrigger trigger="click" rootClose placement="bottom" 
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Content>
                            <Row>
                                <div>Please confirm that you want to delete the user '{props.name}': </div> 
                                <div>{message}</div>
                            </Row>
                            <Row>
                                <Button className="EmployeeInRowButton_confirm uvs-right" 
                                    variant="success" 
                                    onClick={() => removeUser(props.userId, props.companyId)}> 
                                    Confirm 
                                </Button>
                            </Row>
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
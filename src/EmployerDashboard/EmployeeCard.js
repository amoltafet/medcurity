import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button } from 'react-bootstrap';
import './EmployeeCard.css';
import { useState} from "react";
import ConfirmationPopup from './ConfirmationPopup';

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const EmployeeCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
      console.log("Toggling")
    }

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeUser(userId, companyId) {
        console.log("Removing user from company");
    }

    return (
        <>
        <Card className="EmployeeCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="EmployeeCardValues">{props.email}</div>
            </Col>
            <Col sm>
                <div className="EmployeeCardValues">{props.name}</div>
            </Col>
            <Col sm>
                <div className="EmployeeCardValues">{props.progress}</div>
            </Col>
            <Col sm>
                <Button className="EmployeeInRowButton uvs-right" 
                size="sm" 
                variant="danger" 
                onClick={togglePopup}> 
                Remove User </Button>
                
            </Col>
        </Card>
        {isOpen && <ConfirmationPopup 
            content="Please confirm you want to remove this user from your organization" 
            confirmFunction={removeUser}
            confirmFunctionArguments={[props.userId, props.companyId]} 
            toggleCall={togglePopup}
        /> }
        </>
    );
}

export default EmployeeCard;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployerCard.css';
import { useState} from "react";

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const EmployerCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
      console.log("Toggling")
    }

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeEmployer(userId, companyId) {
        console.log("Removing Employer from company");
    }

    const popover = (props) => {
        return (
            <Popover id="popover-basic">
                {props.content}
                <Button className="EmployerInRowButton uvs-right" 
                    variant="success" 
                    onClick={() => removeEmployer(props.userId, props.companyId)}> 
                    Confirm 
                </Button>
            </Popover>
        )
    }
    var userStatus;
    if(props.status == 0) {
        userStatus = "Inactive"
    }
    else if (props.status == 1) {
        userStatus = "Active"
    }
    var companyName;
    for(var i = 0; i < props.companyNames.length; i++) {
        var company = props.companyNames[i]
        if(company.companyid === props.company) {
            companyName = company.name
        }
    }

    return (
        <>
        <Card className="EmployerCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="EmployerCardValues">{props.email}</div>
            </Col>
            <Col sm>
                <div className="EmployerCardValues">{props.name}</div>
            </Col>
            <Col sm>
                <div className="EmployerCardValues">{companyName}</div>
            </Col>
            <Col sm>
                <div className="EmployerCardValues">{userStatus}</div>
            </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="EmployerPopup">
                        <div className="EmployerCardValues">Please confirm that you want to delete the user '{props.name}': </div> 
                        <Button className="EmployerInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeEmployer(props.userId, props.companyId)}> 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="EmployerInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove User </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default EmployerCard;
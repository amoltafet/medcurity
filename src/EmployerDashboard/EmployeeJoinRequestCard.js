import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col } from 'react-bootstrap';
import './EmployeeCard.css';

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
    const EmployeeJoinRequestCard = (props) => {
    return (
        <>
        <Card className="EmployeeJoinRequestCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="EmployeeJoinCardValues">{props.email}</div>
            </Col>
            <Col sm>
                <div className="EmployeeJoinCardValues">{props.name}</div>
            </Col>
            <Col sm>
                <button className="EmployeeAcceptButton" onclick="Remove user"> Accept User</button>
            </Col>
            <Col sm>
                <button className="EmployeeRejectButton" onclick="Remove user"> Remove User </button>
                
            </Col>
        </Card>
        </>
    );
}

export default EmployeeJoinRequestCard;
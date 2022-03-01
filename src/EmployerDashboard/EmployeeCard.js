import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button } from 'react-bootstrap';
import './EmployeeCard.css';

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
    const EmployeeCard = (props) => {
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
                <Button className="EmployeeInRowButton uvs-right" size="sm" variant="danger" onclick="Remove user"> Remove User </Button>
                
            </Col>
        </Card>
        </>
    );
}

export default EmployeeCard;
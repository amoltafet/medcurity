import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col } from 'react-bootstrap';
import './EmployeeCard.css';

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
                <div className="userEmail">{props.email}</div>
            </Col>
            <Col sm>
                <div className="userName">{props.name}</div>
            </Col>
            <Col sm>
                <div className="userScore">{props.score}</div>
            </Col>
            <Col sm>
                <div className="RemoveButton">Remove button</div>
            </Col>
        </Card>
        </>
    );
}

export default EmployeeCard;
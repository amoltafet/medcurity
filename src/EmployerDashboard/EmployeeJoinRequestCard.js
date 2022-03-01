import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button} from 'react-bootstrap';
import './EmployeeCard.css';

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const EmployeeJoinRequestCard = (props) => {

    /**
     * This function removes a user from the invitation table
     * and inserts them into the organization's employees table
     * @param {int} userId 
     */
    const acceptUser = (userId) => {
        console.log("Accepted user");
    }

    /**
     * This function removes a user from the invitation table
     * @param {int} userId 
     */
    function rejectUser(userId) {
        console.log("Reject user");
    }

    return (
        <>
        <Card className="EmployeeJoinRequestCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="EmployeeCardValues">{props.email}</div>
            </Col>
            <Col sm>
                <div className="EmployeeCardValues">{props.name}</div>
            </Col>
            <Col sm>
                <Button className="uvs-right EmployeeInRowButton" variant="success" size="sm" onClick={() => acceptUser(props.userId)}> Accept User</Button>
            </Col>
            <Col sm>
                <Button className="uvs-right EmployeeInRowButton" variant="danger" size="sm" onClick={() => rejectUser(props.userId)}> Reject User </Button>
                
            </Col>
        </Card>
        </>
    );
}

export default EmployeeJoinRequestCard;
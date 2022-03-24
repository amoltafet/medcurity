import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployeeCard.css';
import { useState} from "react";

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
        // axios.post("http://localhost:3002/users/registerEmpty", {
        //     categoryName: categoryName,
        //     points: points,
        //     percentName: percentName, 
        //     lengths: (percent),
        //     userid: session.userid,
        // }).then((response) => {
        //     console.log("response", response.data);
            
        // }).catch(error => console.log(`Error ${error}`));
    }

    const popover = (props) => {
        return (
            <Popover id="popover-basic">
                {props.content}
                <Button className="EmployeeInRowButton uvs-right" 
                    variant="success" 
                    onClick={() => removeUser(props.userId, props.companyId)}> 
                    Confirm 
                </Button>
            </Popover>
        )
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
                <div className="EmployeeCardValues">{String(Boolean(props.activeStatus))}</div>
            </Col>
            <Col sm>
                <div className="EmployeeCardValues">{props.progress}</div>
            </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="EmployeePopup">
                        <div className="EmployeeCardValues">Please confirm that you want to delete the user '{props.name}': </div> 
                        <Button className="EmployeeInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeUser(props.userId, props.companyId)}> 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="EmployeeInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove User </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default EmployeeCard;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './LearningManager.css';
import { useState} from "react";

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const LearningManagerCard = (props) => {
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

    const popover = (props) => {
        return (
            <Popover id="popover-basic">
                {props.content}
                <Button className="LearningManagerInRowButton uvs-right" 
                    variant="success" 
                    onClick={() => removeUser(props.userId, props.companyId)}> 
                    Confirm 
                </Button>
            </Popover>
        )
    }

    return (
        <>
        <Card className="LearningManagerCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="LearningManagerCardValues">{props.email}</div>
            </Col>
            <Col sm>
                <div className="LearningManagerCardValues">{props.name}</div>
            </Col>
            <Col sm>
                <div className="LearningManagerCardValues">{props.progress}</div>
            </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="LearningManagerPopup">
                        <div className="LearningManagerCardValues">Please confirm that you want to delete the user '{props.name}': </div> 
                        <Button className="LearningManagerInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeUser(props.userId, props.companyId)}> 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="LearningManagerInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove User </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default LearningManagerCard;
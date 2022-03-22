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
 

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeModule(userId, companyId) {
        console.log("Removing LearningModule from company");
    }


    return (
        <>
        <Card className="LearningManagerCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="LearningManagerCardValues">{props.learningModuleName}</div>
            </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="LearningManagerPopup">
                        <div className="LearningManagerCardValues">Please confirm that you want to remove the module '{props.learningModuleName}' from your assigned list of modules: </div> 
                        <Button className="LearningManagerInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeModule(props.moduleId, props.companyId)}> 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="LearningManagerInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove Module </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default LearningManagerCard;
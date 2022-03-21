import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './ContentDashboard.css';
import { useState} from "react";

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const ContentCard = (props) => {
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
        <Card className="ContentCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="ContentCardValues">{props.learningModuleName}</div>
            </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="ContentPopup">
                        <div className="ContentCardValues">Please confirm that you want to remove the module '{props.learningModuleName}' from your assigned list of modules: </div> 
                        <Button className="ContentInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeModule(props.moduleId, props.companyId)}> 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="ContentInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove Module </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default ContentCard;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './LearningManager.css';
import { useState, useEffect} from "react";
import Axios from 'axios';
import DatePicker from 'react-date-picker';

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const LearningManagerCard = (props) => {
    const [message, setMessage] = useState('');
    const [dateDue, setDateDue] = useState(new Date());

    // Updates the due date whenever it changes
    useEffect(() => {
        
    }, [dateDue])
 
    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeModule(moduleId, companyId) {
        console.log('Removing Module: ', moduleId)
        Axios.post("http://localhost:3002/users/removeModuleFromCompany",
        { 
        learningModId: moduleId,
        companyid: companyId
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("Removing module!")
            props.setReload(true)
            
        }
        else if (response.data === false)
        {
            setMessage('This has already been removed. Please refresh the page.')
        }
        });
    }


    return (
        <>
        <Card className="LearningManagerCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="LearningManagerCardValues">{props.learningModuleName}</div>
            </Col>
            <Col sm>
                <div><DatePicker onChange={setDateDue} value={dateDue}></DatePicker></div>
            </Col>

            <Col sm>
                <OverlayTrigger trigger="click" rootClose placement="left" 
                overlay={
                    <Popover id="popover-basic" className="LearningManagerPopup">
                        <div className="LearningManagerCardValues">Please confirm that you want to remove the 
                            module '{props.learningModuleName}' from your assigned list of modules. Note that 
                            all users will have to redo this learning module if you delete and re-add it: </div> 
                        <div>{message}</div>
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
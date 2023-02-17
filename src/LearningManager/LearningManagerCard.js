/*
File Name: LearningManagerCard.js
Description: This file contains the card that
    displays a currently assigned learning module. The card
    allows an employer to change the due date or remove the module from assignment.
Last Modified: February 14, 2023
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './LearningManager.css';
import { useState, useEffect} from "react";
import axios from 'axios';
import DatePicker from 'react-date-picker';

/**
 * Panel for LearningModuleCard
 * @param {int} moduleID
 * @param {int} companyID 
 * @param {function} setReload
 * @param {str} learningModuleName
 * @param {str} dueDate 
 */
const LearningManagerCard = (props) => {
    const [dateDue, setDateDue] = useState();

    // Updates the current due date
    useEffect(() => {
        if (props.dueDate !== undefined) {
            setDateDue(new Date(props.dueDate));
        }
    }, [props.dueDate])

    // Updates the due date whenever it changes
    function updateModuleDate(dateDue) {
        setDateDue(dateDue);
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/updateDueDate`,
        { moduleid: props.moduleID, companyid: props.companyID, dueDate: dateDue}).then((response) => {
            if (response.data.success) {
                props.setReload(true);
            }
            else {
                console.log("Error: ", response.data.error);
            }
        }).catch((err) => console.log("Error: ", err));
    }
 
    // Removes a module from currently assigned modules
    function removeModule(moduleid, companyid) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/removeModule`,
        { moduleid: moduleid, companyid: companyid }).then((response) => {
            if (response.data.success) {
                props.setReload(true);
            }
            else {
                console.log("Error: ", response.data);
            }
        }).catch((err) => console.log("Error: ", err));
    }

    return (
        <>
        <Card className="learning_manager_card uvs-right uvs-left text-center" style={{ flexDirection: 'row' }}>
            <Col xs={4} md={4} lg={4}>
                <div className="Learning_Manager_Card_Values_mini">{props.learningModuleName}</div>
            </Col>
            <Col  xs={4} md={4} lg={4}>
                <div><DatePicker className=" uvs-left learning_module_date_picker" onChange={(value) => updateModuleDate(value)} value={dateDue}></DatePicker></div>
            </Col>
            <Col xs={4} md={4} lg={4}>
                <OverlayTrigger trigger="click" rootClose placement="bottom" 
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Content classname="justify-content-center">
                            <Row>
                                <div className="LearningManagerCardValues">Please confirm that you want to remove the 
                                    module '{props.learningModuleName}' from your assigned list of modules. Note that 
                                    all users will have to redo this learning module if you delete and re-add it.</div>
                            </Row>
                            <Row>
                                <Button className="LearningManagerInRowButton_confirm uvs-right" 
                                    variant="success" 
                                    onClick={() => removeModule(props.moduleID, props.companyID)}> 
                                    Confirm 
                                </Button>
                            </Row>
                        </Popover.Content>
                    </Popover>
                }>
                    <Button className="LearningManagerInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    <b>Remove Module</b></Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default LearningManagerCard;
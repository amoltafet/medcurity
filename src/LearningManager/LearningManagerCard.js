import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Row, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './LearningManager.css';
import { useState, useEffect} from "react";
import axios from 'axios';
import DatePicker from 'react-date-picker';
import env from "react-dotenv";

/**
 * Panel for learning Module cards
 * @param {int} moduleId
 * @param {int} companyId 
 * @param {function} setReload
 * @param {str} learningModuleName
 * @returns 
 */
const LearningManagerCard = (props) => {
    const [message, setMessage] = useState('');
    const [dateDue, setDateDue] = useState();

    // Updates the current due date from the database
    useEffect(() => {
        if (props.dueDate != undefined) {
            console.log("New due date: ", props.dueDate)
            setDateDue(new Date(props.dueDate))
        }
    }, [props.dueDate])

    // Updates the due date whenever it changes
    function updateModuleDate(dateDue) {
       
        setDateDue(dateDue)
        console.log('Updating module date: ', props.moduleId, ' to ', dateDue )
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/updateCompanyModuleDueDate`,
        { 
        learningModId: props.moduleId,
        companyid: props.companyId,
        dateDue: dateDue
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("Updating module!")
        }
        else if (response.data === false)
        {
            console.log("Error, module failed to update")
        }
        });
    
    }
 
    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeModule(moduleId, companyId) {
        console.log('Removing Module: ', moduleId)
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/removeModuleFromCompany`,
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
                                    all users will have to redo this learning module if you delete and re-add it. </div> 
                                <div>{message}</div>
                            </Row>
                            <Row>
                                <Button className="LearningManagerInRowButton_confirm uvs-right" 
                                    variant="success" 
                                    onClick={() => removeModule(props.moduleId, props.companyId)}> 
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
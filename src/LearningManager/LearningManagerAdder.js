/*
File Name: LearningModuleAdder.js
Description: This file contains the widget for assigning Learning Modules to employees
    of a company by a user with employer privledges. It is accessed in the upper-right
    corner of the learning-manager page, and is used in the LearningManagerDashboard.
Last Modified: February 14, 2023
*/

import React from 'react';
import {Card, Button, Row} from 'react-bootstrap';
import { useEffect, useState} from "react";
import './LearningManagerAdder.css'
import axios from 'axios';

/**
 * This class allows employers to assign LearningModules to their employees.
 * @param {int} companyID
 * @param {bool} reload
 * @param {function} setReload
 */
const LearningModuleAdder = (props) => {
    axios.defaults.withCredentials = true;
    const [message, setMessage] = useState("");
    const [modules, setModules] = useState("");
    const [learningModule, setLearningModule] = useState(0);
    const [isLoading, setLoading] = useState(true)
    
    // Manages the loading state for companyId
    useEffect(() => {
        if (Number.isInteger(props.companyID)) {
            setLoading(false)
        }
    }, [props.companyID])

    // Query for LearningModules not included assigned by the company already
    // Assigns LearningModule with the first module returned
	useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/modules/unassignedModules`, { params: { companyid: props.companyID
            } }).then((response) => {
                setModules(Object.values(response.data))     
                if (Object.values(response.data).length > 0)             
                    setLearningModule(Object.values(response.data)[0].ID)
            });
        }
	}, [isLoading, props.reload, props.companyID])

    /**
     * Adding a module based on current learningModule variable
     * @param {array} items 
     */
    const addModule = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/modules/assignModule`,
        {moduleid: learningModule, companyid: props.companyID}).then((response) => {
            if (response.data.success && response.data.added) {
                props.setReload(true)
            }
            else if (response.data.success && !response.data.added) {
                setMessage('This learning module is already assigned! Please try a different learning module.');
            }
        }).catch((error) => console.log("Error while atttempting to add module: ", error));
    };

    /**
     * Create an HTML list of options
     * @param {array} items 
     */
    function createDropDownOptions(items) {
        const dropdownList = [];
        for (let index in items) {
            let item = items[index];
            dropdownList.push(<option classname="learningModule font" value={item.ID}>{item.Title}</option>); 
        }
        return dropdownList;
    }

    return (
        <Card className="Learning_Manager_Invite_Request_Card uvs-right">
             <Row xs={7} md={12} lg={12}> 
                <Card.Title className="register_header_add_learning_module"><b>Add a Learning Module: </b></Card.Title>
            </Row>
            <Row xs={7} md={12} lg={12}> 
                <Card.Subtitle className="invite_subtitle_learning_manager">Choose a learning module to assign to all of your employees.</Card.Subtitle>
            </Row>
            <Row xs={2} md={7} lg={12}  className="justify-content-center text-center">
                <form className="learningModule_add_module_form_container" onSubmit={addModule}>
                    <label className="learningModule_add_module_form">
                    
                        <select className="learningModule_add_module_form" value={learningModule} 
                            onChange={ (e) => 
                            {
                                setLearningModule(e.target.value);
                            }}>
                            {createDropDownOptions(modules)}
                        </select>
                    </label>
                </form>
                <div className="invite_subtitle_learning_manager">{message}</div>
            </Row>
            <Row xs={2} md={7} lg={7} className="justify-content-center">
                <Button className="create_button_learning_manager uvs-left" onClick={addModule}>Submit</Button>
            </Row>   
        </Card>
    );
}

export default LearningModuleAdder;
/*
File Name: LearningManagerCards.js
Description: This file contains the widget that contains the cards
    displaying the currently assigned learning modules. These cards
    allow an employer to change the due date or remove the module from assignment.
Last Modified: February 14, 2023
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import axios from 'axios';
import LearningManagerCard from './LearningManagerCard'

/**
 * Returns Panels of the LearningManager Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @param {int} companyID
 * @param {bool} reload
 * @param {function} setReload
 */
const LearningManagersCards = (props) => {
    const [currLearningModules, setCurrLearningModules] = useState([])
    const [dueLearningModules, setDueLearningModules] = useState([])
    const [isLoading, setLoading] = useState(true)

    // Manage the loading state for later useEffects
    useEffect(() => {
        if (Number.isInteger(props.companyID)) {
            setLoading(false)
        }
    }, [props.companyID])

    // Get all of the LearningModules in a company
    useEffect(() => {
        if (!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
                { params: { the_query: 'SELECT * ' +
                'FROM CompanyLearningModules ' + 
                    'JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ' + 
                'WHERE CompanyLearningModules.CompanyID = ' + String(props.companyID)  
                }}).then((response) => {
                    let learningModules = Object.values(response.data);
                    let today = new Date();
                    let currLMs = [];
                    let dueLMs = [];

                    learningModules.forEach(lm => {
                        let dueDate = new Date(lm.DueDate);
                        let difference = today.getTime() - dueDate.getTime();
                        if (difference <= 0) {
                            currLMs.push(lm);
                        }
                        else {
                            dueLMs.push(lm);
                        }
                    });

                    setCurrLearningModules(currLMs);
                    setDueLearningModules(dueLMs);
            });
        }
    }, [isLoading, props.reload, props.companyID])

    /**
     * Create directory cards from modules
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createLearningManagerCards(modules) {
        const objs = [];
        for (let index in modules) {
            let module = modules[index];
            objs.push(<LearningManagerCard learningModuleName={module.Title} moduleID={module.ID} companyID={module.CompanyID} dueDate={module.DueDate} setReload={props.setReload}/>);
        }
        return objs;
    }

    return (
        <>
        <Card className="Current_Modules_Learning_Manager uvs-right">
            <Card.Title className="employee_learning_modules_manager_title">Upcoming Learning Modules</Card.Title>      
            <CardDeck style={{display: 'flex', flexDirection: 'column'}}> 
            <Card className="Learning_Manager_Card_Header uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col xs={4} md={4} lg={4}>
                    <div className="Learning_Manager_Card_Values_learning_manager text-center"><b>Learning Module Name</b></div>
                </Col>
                <Col xs={4} md={4} lg={4}>
                    <div className="date_picker_learning_manager_col text-center"><b>Date Due (PST)</b></div>
                </Col>
                <Col xs={4} md={4} lg={4}>
                    <div className="Remove_Button_learning_manager_col text-center"><b>Remove Module</b></div>
                </Col>
            </Card>
            </CardDeck>      
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createLearningManagerCards(currLearningModules)}
            </CardDeck>
        </Card>
        <Card className="Current_Modules_Learning_Manager uvs-right">
            <Card.Title className="employee_learning_modules_manager_title">Due Learning Modules</Card.Title>      
            <CardDeck style={{display: 'flex', flexDirection: 'column'}}> 
            <Card className="Learning_Manager_Card_Header uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col xs={4} md={4} lg={4}>
                    <div className="Learning_Manager_Card_Values_learning_manager text-center"><b>Learning Module Name</b></div>
                </Col>
                <Col xs={4} md={4} lg={4}>
                    <div className="date_picker_learning_manager_col text-center"><b>Date Due (PST)</b></div>
                </Col>

                <Col xs={4} md={4} lg={4}>
                    <div className="Remove_Button_learning_manager_col text-center"><b>Remove Module</b></div>
                </Col>
            </Card>
            </CardDeck>
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createLearningManagerCards(dueLearningModules)}
            </CardDeck>
        </Card>
        </>
    );
}

export default LearningManagersCards
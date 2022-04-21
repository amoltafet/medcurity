import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import axios from 'axios';
import LearningManagerCard from './LearningManagerCard'

/**
 * Returns Panels of the LearningManager Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @param {int} companyId
 * @returns 
 */
const LearningManagersCards = (props) => {
    const [learningModules, setLearningModules] = useState([])
    const [isLoading, setLoading] = useState(true)

    // Manage the loading state for later useEffects
    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    // Get all of the learningModules in a company
    useEffect(() => {
        if (!isLoading) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT * ' +
                'FROM CompanyLearningModules ' + 
                    'JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ' + 
                'WHERE CompanyLearningModules.CompanyID = ' + String(props.companyId)  
                }}).then((response) => {
                    setLearningModules(Object.values(response.data))
            });
        }
    }, [isLoading, props.reload])

    /**
     * Create directory cards from modules
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createLearningManagerCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<LearningManagerCard learningModuleName={module.Title} moduleId={module.ID} companyId={module.CompanyID} dueDate={module.DueDate} setReload={props.setReload}/>)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Card className="Current_Modules_Learning_Manager uvs-right">
            <Card.Title className="employee_learning_modules_manager_title">Current Learning Modules</Card.Title>      
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
                {createLearningManagerCards(learningModules)}
            </CardDeck>

        </Card>
        </>
    );
}

export default LearningManagersCards
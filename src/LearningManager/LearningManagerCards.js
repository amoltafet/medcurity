import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Image, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';
import LearningManagerCard from './LearningManagerCard'

/**
 * Returns Panels of the LearningManager Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @returns 
 */
const LearningManagersCards = (props) => {
    const [learningModules, setLearningModules] = useState([])
    const [isLoading, setLoading] = useState(true)

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
                }}).then((err, response) => {
                    console.log(err)
                    setLearningModules(Object.values(response.data))
            });
        }
    }, [isLoading, props.reload])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createLearningManagerCards(modules, maxLength=-1) {
        console.log(modules)
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<LearningManagerCard learningModuleName={module.Title} moduleId={module.ID} companyId={module.CompanyID} setReload={props.setReload}/>)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Container className="EmployerJoinRequests uvs-right">
            <h2>Current Learning Modules</h2>      
            <Card className="LearningManagerCardHeader uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col sm>
                    <div className="LearningManagerCardValues">Learning Module Name</div>
                </Col>
                <Col sm>
                    <div className="LearningManagerCardValues">Date Due (PST)</div>
                </Col>
                <Col sm>
                    <div className="RemoveButton"></div>
                </Col>
            </Card>
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createLearningManagerCards(learningModules)}
            </CardDeck>

        </Container>
        </>
    );
}

export default LearningManagersCards
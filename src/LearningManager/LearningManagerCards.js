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
    // let learningModules = [
    //     {Name:"Privacy", Email:"j@gmail.com", Progress:1},
    //     {Name:"bio", Email:"ja@gmail.com", Progress:1},
    //     {Name:"jerseys", Email:"je@gmail.com", Progress:21}
    // ]

    // Get all of the learningModules in a company
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT * ' +
            'FROM CompanyLearningModules ' + 
            'WHERE CompanyLearningModules.CompanyID = ' + String(props.companyId)  
            }}).then((response) => {
                setLearningModules(Object.values(response.data))
        });
    }, [props.companyId])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createLearningManagerCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<LearningManagerCard learningModuleName={module.Name} moduleId={module.Id} companyId={module.CompanyId} />)
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
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleCard.css'
import { Card, Image, Button, Container, CardDeck } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Cards 
 * @returns 
 */
const LearningModulesCards = () => {
    const userId = 100
    const [cards, setCards] = useState([])

    // Query for getting user's required learning modules
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT * FROM LearningModules JOIN AssignedLearningModules ON LearningModules.ID = AssignedLearningModules.LearningModID WHERE AssignedLearningModules.UserID = ' + userId} 
            }).then((response) => {
                setCards(Object.values(response.data))
        });
    }, [])


    /**
     * Panel for Module cards
     * @param {} props 
     * @returns 
     */
    const ModulePanel = (props) => {
        return (
            <>
            <Card className="LearningModuleCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Link className="font" href={"/learning-module/" + props.link} >{props.title}</Card.Link>
                </Card.Body> 
            </Card>
            </>
        );
    }

    /**
     * Create directory cards from modules
     */
    function createModuleCards(modules) {
        const objs = [];
        for (let index in modules) {
            module = modules[index]
            objs.push(<ModulePanel title={module.Title} link={module.ID} />)
        }
        return objs;
    }

    /**
     * This function returns a header for module cards
     * @param {obj} modules 
     */
    function createModuleCardHeader(modules) {
        const objs = [];
        objs.push(<h2>Required Learning Modules</h2>);
        if(modules.length == 0) {
            objs.push(<h4>You currently have no required modules</h4>);
        }

        return objs;
    }

    return (
        <>
        <Container className=" LearningModulesCards">                
            {createModuleCardHeader(cards)}
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createModuleCards(cards)}
        </CardDeck>
        <div className="d-grid gap-2">
        </div>
        </>
    );
    //TODO 
    // Add '16more' label
}

export default LearningModulesCards
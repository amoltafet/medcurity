import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModulesCards.css'
import { Card,  Button, Container, CardDeck } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Cards 
 * @returns 
 */
const LearningModulesCards = (props) => {
    const userId = String(props.user.userid)
    const [isLoading, setLoading] = useState(true)
    const [learningModules, setLearningModules] = useState([])

    useEffect(() => {
        if (props.user != undefined) {
            setLoading(false)
        }
    }, [props.user])

    // Query for getting user's required learning modules
    useEffect(() => {
        if (!isLoading && userId !== undefined) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT * FROM LearningModules JOIN AssignedLearningModules ON LearningModules.ID = AssignedLearningModules.LearningModID WHERE AssignedLearningModules.UserID = ' + userId} 
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            });
        }
    }, [userId, isLoading])

    
   
    /**
     * Panel for Module cards
     * @param {} props 
     * @returns 
     */
    const ModulePanel = (props) => {
        var dueDate = new Date(props.dueDate); 
        console.log("duedate: ", dueDate)
        return (
           
            <>
            <Card className="LearningModuleCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Link className="font" href={"/learning-module/" + props.link} >{props.title}</Card.Link>
                   <Card.Text className="dueDateRequiredModule">Due At: {dueDate.toDateString()}</Card.Text>
                </Card.Body> 
            </Card>
            </>
        );
    }

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createModuleCards(modules, maxLength=5) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; }
            module = modules[index]
            console.log(module)
            objs.push(<ModulePanel title={module.Title} link={module.ID} dueDate={module.DueDate} />)
            size += 1;
            console.log(module)
        }
        return objs;
    }

    /**
     * This function returns a header for module cards
     * @param {obj} modules 
     */
    function createModuleCardHeader(modules) {
        const objs = [];
        //objs.push(<h2>Required Learning Modules</h2>);

        objs.push(
            <h2 className="text-center requiredModulesRow"> Required Learning Modules: &nbsp;  
                <Button
                    id="select-more-modules"
                    href='learning-directory'
                    className="moduleCardHeaderButton font uvs-left">
                    {modules.length} remaining required modules
                </Button>
            </h2>
            
        );
        return objs;
    }

    return (
        <>
            <Container className="LearningModulesCards">                
                {createModuleCardHeader(learningModules)}
            </Container>
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
                {createModuleCards(learningModules, 5)}
            </CardDeck>
            <div className="d-grid gap-2">
            </div>
        </>
    );
}

export default LearningModulesCards
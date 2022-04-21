import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModulesCards.css'
import { Card,  Button, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Cards 
 * @param {obj} user
 * @returns 
 */
const LearningModulesCards = (props) => {
    const userId = String(props.user.userid);
    const [isLoading, setLoading] = useState(true);
    const [learningModules, setLearningModules] = useState([]);
    const [completedModules, setCompletedModules] = useState([]);

    /**
     * Makes sure user data is loaded
     */
    useEffect(() => {
        if (props.user !== undefined) {
            setLoading(false)
        }
    }, [props.user])

    /**
     *  Query for getting user's required learning modules
     */ 
    useEffect(() => {
        if (!isLoading && userId !== undefined) {
            axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
                { params: { userid: userId }
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            }).catch(error => console.error(`Error ${error}`));
            axios.get('http://localhost:3002/api/getQuery',{
			params: { the_query: `SELECT * FROM CompletedModules WHERE UserID = '${userId}'`}
            }).then((response) => {
                setCompletedModules(Object.values(response.data));
            })
        }
    }, [userId, isLoading])

    /**
     * Removes compled modules from assigned  
     */
    useEffect(() => {
        if (completedModules.length !== 0 && learningModules !== null) {
            for (let i = 0; i < completedModules.length; i++) {
                for (let j = 0; j < learningModules.length; j++) {
                    if (completedModules[i].LearningModID === learningModules[j].LearningModID && completedModules[i].UserID !== userId) {
                        setCompletedModules(learningModules.splice(j,1)); 
                    }
                }
            }
        }
    }, [learningModules, completedModules, userId, isLoading])

    /**
     * Panel for Module cards
     * @param {} props 
     * @returns 
     */
    const ModulePanel = (props) => {
        var dueDate = new Date(props.dueDate); 
        dueDate.setDate((dueDate.getDate() + 1));
        return (
           
            <>
            <a href={"/learning-module/" + props.link} style={{ cursor: "pointer" }} className="LearningModuleCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Title className="testPanelFont" href={"/learning-module/" + props.link} >{props.title}</Card.Title>
                   <Card.Text className="dueDateRequiredModule">Due At: {dueDate.toDateString()}</Card.Text>
                </Card.Body> 
            </a>
            </>
        );
    }

    /**
     * Create directory cards from modules
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createModuleCards(modules, maxLength) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; }
            var newModule = modules[index]
            objs.push(<ModulePanel title={newModule.Title} link={newModule.ID} dueDate={newModule.DueDate} />)
            size += 1;
        }
        return objs;
    }

    /**
     * This function returns a header for module cards
     * @param {obj} modules 
     */
    function createModuleCardHeader() {
        const objs = [];
        //objs.push(<h2>Required Learning Modules</h2>);

        objs.push(
            <h2 className="text-center requiredModulesRow">&nbsp;  
                <Button
                    id="select-more-modules"
                    href='learning-directory'
                    className="moduleCardHeaderButton font uvs-left">
                    {learningModules.length} remaining required modules
                </Button>
            </h2>
            
        );
        return objs;
    }

    return (
        <>
            <Container className="LearningModulesCards">                
                {createModuleCardHeader()}
            </Container>
            <Row className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
                {createModuleCards(learningModules, 5)}
            </Row>
            <div className="d-grid gap-2">
            </div>
        </>
    );
}

export default LearningModulesCards
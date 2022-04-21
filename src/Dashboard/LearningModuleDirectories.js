import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleDirectories.css'
import { Card, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Directories 
 * NOTE: Not in use as of 4/20/2022
 * @returns 
 */
const LearningModuleDirectories = () => {
    const [directories, setDirectories] = useState([])

    // Query for getting LearningDirectories Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT * FROM LearningModulesDirectory"} }).then((response) => {
              setDirectories(Object.values(response.data))
        }).catch(error => console.error(`Error ${error}`));
    }, [])



    /**
     * Panel for directories
     * @param {} props 
     * @returns 
     */
    const DirectoryPanel = (props) => {
        return (
            <>
            <a href={"/learning-module/" + props.link} style={{ cursor: "pointer" }} className="LearningModuleDirectoriesCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Text className="LearningModuleDirectoriesCardFont"  >{props.title}</Card.Text>
                </Card.Body> 
            </a>
            </>
        );
    }

    /**
     * Create directory cards from modules
     */
    function createDirectoriesCards(modules) {
        const objs = []
        for (let index in modules) { 
            var module = modules[index]
            objs.push(<DirectoryPanel title={module.Title} link={module.ID} />)
        }
        return objs;
    }

    return (
        <>
        <Row className="LearningModulesDirectoriesDashboard" >
            {createDirectoriesCards(directories)}
        </Row>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}

export default LearningModuleDirectories
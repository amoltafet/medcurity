import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleDirectories.css'
import { Card, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Directories 
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
        console.log("e", props.title)
        return (
            <>
            <Card className="LearningModuleDirectoriesCard uvs-right uvs-left">
                <Card.Body>
                   <Card.Link className="LearningModuleDirectoriesCardFont" href={"/learning-directory/" + props.link} >{props.title}</Card.Link>
                </Card.Body> 
            </Card>
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
        <Container className=" LearningModulesDirectories">
            
            <h2 className="text-center LearningModulesDirectoriesFont">Learning Module Directories</h2>
        </Container>
        <Row className="LearningModulesDirectoriesDashboard" >
            {createDirectoriesCards(directories)}
        </Row>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}

export default LearningModuleDirectories
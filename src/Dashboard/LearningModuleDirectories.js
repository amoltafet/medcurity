import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleDirectoriesCard.css'
import { Card, Container, CardDeck } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

/**
 * Returns Panels of the Learning Module Directories 
 * @returns 
 */
const LearningModulesDirectories = () => {
    const [directories, setDirectories] = useState([])

    // Query for getting LearningDirectories Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT * FROM LearningModulesDirectory"} }).then((response) => {
              setDirectories(Object.values(response.data))
        });
    }, [])


    /**
     * Panel for directories
     * @param {} props 
     * @returns 
     */
    const DirectoryPanel = (props) => {
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
            module = modules[index]
            objs.push(<DirectoryPanel title={module.Title} link={module.ID} />)
        }
        return objs;
    }

    return (
        <>
        <Container className=" LearningModulesDirectories">
            
            <h2>Learning Module Directories</h2>
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createDirectoriesCards(directories)}
        </CardDeck>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}

export default LearningModulesDirectories
import {Button, CardDeck,  Container} from 'react-bootstrap'
import React from 'react';
import './LearningDirectoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import LearningModulePanel from './LearningModulePanel';

/**
* Creates and displays the learning page for each test category. 
* @return { LearningDirectoryPage}
*/
const  LearningDirectoryPage = () => {
    let { slug } = useParams();
    const [directory, setDirectory] = useState([])
    const [modules, setModules] = useState([])

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    // Query for getting LearningModules Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT * FROM LearningModulesDirectory WHERE ID = " + slug } }).then((response) => {
              setDirectory(Object.values(response.data))
        });
    }, [])

    // Query for getting info on learning modules associated with the directory
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query:"SELECT * FROM LearningModules WHERE DirID = " + slug} }).then((response) => {
            setModules(Object.values(response.data))
        });
    }, [])

    /**
     * Create directory cards from modules
     */
    function createDirectoryCards(modules) {
        const objs = []
        for (let index in modules) {
            module = modules[index]
            objs.push(<LearningModulePanel title={module.Title} link={module.ID} />)
        }
        return objs;
    }

    const directoryTitle = directory.map((directory) => {
        
        return directory.Title
    })

    return (
        <>
        <Container className=" LearningDirectoryPageContainer">
            
            <h1>{directoryTitle} Learning Modules Directory</h1>
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createDirectoryCards(modules)}
        </CardDeck>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}
export default  LearningDirectoryPage;
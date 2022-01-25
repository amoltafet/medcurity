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
        axios.get('http://localhost:3002/api/getModuleDirectoryInfo', { params: { id: slug } }).then((response) => {
              setDirectory(Object.values(response.data))
        });
    }, [])

    // Query for getting info on learning modules associated with the directory
    useEffect(() => {
        axios.get('http://localhost:3002/api/getDirectoryModulesInfo', { params: { id: slug } }).then((response) => {
            setModules(Object.values(response.data))
        });
    }, [])

    /**
     * Create directory cards
     */
    function createDirectoryCards(modules) {
        const objs = []
        for (module in modules) {
            objs.push(<LearningModulePanel title={module.Title} link={module.id} />)
        }
        return objs;
    }

    const fake_data = [
      {title:'Title1', id: 'id1'},
      {title:'Title2', id: 'id2'},
    ]

    const LearningDirectoryPageContent = modules.map((modules) => {
        return ([
            <h1 className="text-center mt-3">
              {slug} Module Directory
            </h1>,
            <h6 className="text-center  mt-2">
              {modules.Subtitle}
            </h6>,
            <h4 className="text-left mt-3">
              {modules.Description}
            </h4>,
            createDirectoryCards(fake_data),
        ]);
    })

    return (
        <>
        <Container className=" LearningDirectoryPageContainer">
            {LearningDirectoryPageContent}
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createDirectoryCards(fake_data)}
        </CardDeck>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}
export default  LearningDirectoryPage;
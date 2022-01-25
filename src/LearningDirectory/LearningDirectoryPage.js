import {Button,  Container} from 'react-bootstrap'
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
    const [content, setContent] = useState([])

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    // Query for getting LearningModules Directory info
    useEffect(() => {
        axios.get('http://localhost:3002/api/getModuleDirectoryInfo', { params: { id: slug } }).then((response) => {
              setContent(Object.values(response.data))
          });
    }, [])

    // Query for getting info on learning modules associated with the directory
    useEffect(() => {
      axios.get('http://localhost:3002/api/getModulesInfo', { params: { id: slug } }).then((response) => {
            setContent(Object.values(response.data))
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

    const LearningDirectoryPageContent = content.map((modules) => {
        return ([
            <h1 className="text-center mt-3">
              {modules.Title} Module Directory
            </h1>,
            <h6 className="text-center  mt-2">
              {modules.Subtitle}
            </h6>,
            <h4 className="text-left mt-3">
              {modules.Description}
            </h4>,
            createDirectoryCards(modules),
        ]);
    })

    return (
        <>
        <Container className=" LearningDirectoryPageContainer">
            {LearningDirectoryPageContent}
        </Container>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}
export default  LearningDirectoryPage;
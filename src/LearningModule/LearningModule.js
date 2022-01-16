import {Button,  Container} from 'react-bootstrap'
import React from 'react';
import './LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LearningContent from './LearningContent.js';
import { useEffect } from "react";
import { useParams } from "react-router";


/**
* Creates and displays the learning page for each test category. 
* @return { LearningModule}
*/
const  LearningModule = () => {
    let { slug } = useParams();

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    

    return (
        <>
        
        <Container className=" LearningModuleContainer">
            <LearningContent title={slug} paragraph = "This is some text." />
        </Container>
        <div className="d-grid gap-2">
            <Button variant="primary" href={'/quiz/' + slug}>
                Go to Quiz
            </Button>
        </div>
        </>
    );
}
export default  LearningModule;
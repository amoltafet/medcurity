import {Button,  Container} from 'react-bootstrap'
import React from 'react';
import './LearningPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar';
import LearningContent from './LearningContent.js';
import { useEffect } from "react";
import { useParams } from "react-router-dom";


/**
* Creates and displays the learning page for each test category. 
* @return {LearningPage}
*/
const LearningPage = () => {
    const slug = useParams();

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug.slug]);

    return (
        <>
        <MenuBar></MenuBar>
        <Container className="learningPageContainer">
            <LearningContent title={slug.slug} paragraph = "This is some text." />
        </Container>
        <div className="d-grid gap-2">
            <Button variant="primary" href="/quiz">
                Go to Quiz
            </Button>
        </div>
        </>
    );
}
export default LearningPage;
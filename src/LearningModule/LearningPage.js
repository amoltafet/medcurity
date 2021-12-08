import {Button,  Container} from 'react-bootstrap'
import React from 'react';
import './LearningPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar';
import LearningContent from './LearningContent.js';


/**
* Creates and displays the learning page for each test category. 
* @return {LearningPage}
*/
const LearningPage = () => {
    const myanswers = ["42", "Life is the meaning of life", "13"];
    const question = "What is the meaning of life?";
    const number = 1;

    return (
        <>
        <MenuBar></MenuBar>
        <Container className="learningPageContainer">
            <LearningContent title="Privacy" paragraph = "This is some text." />
        </Container>
        <div className="d-grid gap-2">
            <Button variant="primary" href="/quiz">
                "Go to Quiz"
            </Button>
        </div>
        </>
    );
}
export default LearningPage;
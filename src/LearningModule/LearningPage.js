import {Button, Image, Row, Form, Container, Card} from 'react-bootstrap'
import React from 'react';
import './LearningPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LearningMenubar from './LearningMenubar';


const LearningPage = () => {
    const myanswers = ["42", "Life is the meaning of life", "13"];
    const question = "What is the meaning of life?";
    const number = 1;

    return (
        <>
        <LearningMenubar></LearningMenubar>
        <Container className="learningPageContainer">
            <dir>"Hello World"</dir> 
        </Container>
        </>
    );
}
export default LearningPage;
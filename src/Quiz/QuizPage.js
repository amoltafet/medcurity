import {Button, Image, Row, Form, Container, Card} from 'react-bootstrap'
import React from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuizMenubar from './QuizMenubar';
import Questions from './Questions'

const QuizPage = () => {
    const myanswers = ["42", "100", "13"];

    return (
        <>
        <QuizMenubar></QuizMenubar>
        <Container className="quizPageContainer">
            <Questions>
                answers=myanswers
            </Questions>
        </Container>
        </>
    );
}
export default QuizPage;
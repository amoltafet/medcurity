import {Button, Image, Row, Form, Container, Card} from 'react-bootstrap'
import React from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuizMenubar from './QuizMenubar';
import Questions from './Questions'

const QuizPage = () => {
    return (
        <>
        <QuizMenubar></QuizMenubar>
        <Container className="quizPageContainer">
            <Questions>
                answers=["42", "100", "13"]
            </Questions>
        </Container>
        </>
    );
}
export default QuizPage;
import {Container} from 'react-bootstrap'
import React from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuizMenubar from './QuizMenubar';
import Questions from './Questions'

const QuizPage = () => {
    const myanswers = ["42", "Life is the meaning of life", "13"];
    const question = "What is the meaning of life?";
    const number = 1;

    return (
        <>
        <QuizMenubar></QuizMenubar>
        <Container className="quizPageContainer">
            <Questions 
            question={question}
            number={number}
            answers={myanswers} 
            />
        </Container>
        </>
    );
}
export default QuizPage;
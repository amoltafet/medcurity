import {Container} from 'react-bootstrap'
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
                
            </Questions>
        </Container>
        </>
    );
}
export default QuizPage;
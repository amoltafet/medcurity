import React from 'react';
import './QuizImage.css';
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Image} from 'react-bootstrap'

const QuizImage = () => {
  return (
    <>
    <Container className="quizContainer">
        <Button href="/dash">X</Button>
        <Image className="quizImage" variant="top" src="/quiz.jpg" alt=""  ></Image>
    </Container>
    </>
  );
}

export default QuizImage;

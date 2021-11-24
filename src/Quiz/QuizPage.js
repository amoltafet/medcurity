import {Button, Image, Row, Form, Container, Card} from 'react-bootstrap'
import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuizMenubar from './QuizMenubar';
import Questions from './Questions'
import axios from 'axios';

/**
 * 
 * @param {str} category Question category to get questions from
 * @param {int} index Index of question 
 */
function GetQuestionByIndex(category, index)
{
  const [question, getQuestions] = useState([]);

  const url = 'http://localhost:3002/api/getCategoryQuestions'

  useEffect(() => {
    getQuestionsIncategory();
  }, [])

  const getQuestionsIncategory = () => {
    axios.get(`${url}`, { params: { filter: category } }).then((response) => {
      const data = response.data
      console.log(data.length)

      getQuestions(data[index]);
    }).catch(error => console.error(error));
  }

  return (
    <Questions 
    question={question.question}
    answers={[question.solution, question.a2, question.a3, question.a4]} 
    />
  )
}

const QuizPage = () => {
    console.log('displaying quiz page')

    return (
        <>
        <QuizMenubar></QuizMenubar>
        <Container className="quizPageContainer">
            <>
              <h3> Question {'1'}: </h3> 
              {GetQuestionByIndex('privacy', 0)}
              <h3> Question {'2'}: </h3> 
              {GetQuestionByIndex('privacy', 1)}
              <h3> Question {'3'}: </h3> 
              {GetQuestionByIndex('hipaa', 2)}
            </>
        </Container>
        </>
    );
}
export default QuizPage;
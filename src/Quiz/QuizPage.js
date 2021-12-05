import {Container} from 'react-bootstrap'
import React,{useState,useEffect} from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar'
import Questions from './Questions'
import axios from 'axios';

/**
 * 
 * @param {str} category Question category to get questions from
 * @param {int} index Index of question in the returned query
 */
function GetQuestionByIndex(category, index)
{
  // The route for axios.get() to use to query the db
  const url = 'http://localhost:3002/api/getCategoryQuestions'

  // I am unsure why useState() and useEffect() makes this work,
  // but plenty of online examples I viewed used this pattern.
  const [question, getQuestions] = useState([]);

  useEffect(() => {
    getQuestionsIncategory();
  }, [])

  // Create a GET HTTP request that uses the getCategoryQuestions route to 
  // query the db for questions in the specified category.
  // Then choose a question from the query result using the index param.
  const getQuestionsIncategory = () => {
    axios.get(`${url}`, { params: { filter: category } }).then((response) => {
      const data = response.data
      getQuestions(data[index]);
    }).catch(error => console.error(error));
  }

  // Return the question component with question info from the query
  // into the components props.
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
        <MenuBar></MenuBar>
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

import {Button, Card, Image, Row} from 'react-bootstrap'
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
  var questionNumber = 0;
  var questionNameCategorgy = 'privacy';

  function DisplayOneQuestionAtATime (direction, position) {
    if (direction === "add" && position !== 0) {
       
    }
    else if (direction === "minus") {

    }   
  }

  var direction="add";
  return (
    <>  
      <MenuBar></MenuBar>
      <Card className="quizPageContainer uvs-left uvs-right">
        <h3 className="questionNumbers text-center"> Question {questionNumber + 1}: </h3> 
        {GetQuestionByIndex('privacy', questionNumber)}
        <Row>
          <Button 
            type="submit" 
            className="toggleQuestionLeft" 
            onClick={DisplayOneQuestionAtATime("add", questionNumber)}> 
              <Image className="leftArrow" src="/left.png"></Image> 
          </Button> 
          <Button 
            type="submit" 
            className="toggleQuestionRight" 
            onClick={DisplayOneQuestionAtATime("minus", questionNumber)}> 
              <Image className="rightArrow" src="/right.png"></Image> 
          </Button>
        </Row>
      </Card>
    </>
  );
}
export default QuizPage;

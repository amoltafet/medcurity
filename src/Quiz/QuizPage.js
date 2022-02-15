import { Button, Image, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import Questions from './Questions'

import axios from 'axios';



const QuizPage = () => {
  console.log('displaying quiz page');
  var [content, setContent] = useState([])
  const [numQuestions, setNumQuestions] = useState("")
  const [question, setQuestion] = useState([])
  var [index, setQuestionIndex] = useState([])
   // data array that holds question information using state
  const [data,setData]=useState([
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
    { answer:"", correct: false},
  ]);

  let { slug } = useParams();
  useEffect(() => {
    // Fetch post using the postSlug
  }, [slug]);
  
 

  useEffect(() => {
    axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
      setContent(Object.values(response.data))
    });
  }, [])

 useEffect(() => {
    var questionIndex = 0;
    setQuestionIndex(questionIndex)
  })
 
  

  const QuestionContent = content.map((question) => {
    index++;   
    //document.getElementById('toggleQuestionLeft').disabled = true;
    //setData(newData);
    if (index === 1) {
    return ([
      <Questions
        i={index - 1}
        question={question.question}
        answers={[question.solution, question.a2, question.a3, question.a4]}
        action={adjustStateData}
      />
    ]);
  }

  })

  function previousQuestion (question) {
    if (index !== 0) {
      index -= index;
    //const newData = data.concat({answer: "", correct: false});
    console.log("yuh", question)
    //setData(newData);
    if (index === 1) {
    return ([
      <Questions
        i={index - 1}
        question={question.question}
        answers={[question.solution, question.a2, question.a3, question.a4]}
        action={adjustStateData}
      />
    ]);
  }
  }
  }

  function nextQuestion () {
    if (index !== 0) {
      console.log(index)
    var nextq = data[index + 1];
    setQuestion(nextq);
  
    //const newData = data.concat({answer: "", correct: false});

    console.log("yuh", nextq)
    
  }
  }


  /** 
   * 
   * @param {int} index Index of question that is clicked on by user
   * @param {str} answer String value of answer that was clicked on 
   * Function is used as an onChange function for the question toggle buttons to change state data
  */
  function adjustStateData(index, answer) {
    // console.log(numQuestions[0].NumberOfQuestions);
    // let newData=data[index];
    // newData["answer"]=answer;
    // data[index]=newData;
    // setData([...data]);
    // console.log("" + answer);
  }


  return (
    <>
      <MenuBar></MenuBar>
      <div id="quizPageContainer" className="">
        {QuestionContent} 
        <Row>
          <Button
            id="leftQuestionBttn"
            type="submit"
            className="toggleQuestionLeft"
            onClick={() => previousQuestion()}>
            <Image className="leftArrow" src="/left.png"></Image>
          </Button>
          <div className="questionPosOutOfTotal text-center " id="questionPosOutOfTotal"> 1/0 </div>
          <Button
            id="rightQuestionBttn"
            type="submit"
            className="toggleQuestionRight"
            onClick={() => nextQuestion()}>
            <Image className="rightArrow" src="/right.png"></Image>
          </Button>
        </Row>
        <SubmitButton value="Submit"></SubmitButton>
        {console.log("finished rendering")}
      </div>
    </>
  );
}
export default QuizPage;
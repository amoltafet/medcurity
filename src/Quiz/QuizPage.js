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
  var [questionIndex, setQuestionIndex] = useState([])
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
 
  
  var index = 0;
  // const QuestionContent = content.map((question) => {
  //   index++;   
  //   document.getElementById('leftQuestionBttn').disabled = true;
  //   document.getElementById('questionPosOutOfTotal').textContent = `${questionIndex + 1} / ${content.length}`;
  //   //setData(newData);
  //   if (index === 1) {
  //   return ([
  //     <Questions
  //       i={index - 1}
  //       question={question.question}
  //       answers={[question.solution, question.a2, question.a3, question.a4]}
  //       action={adjustStateData}
  //     />
  //   ]);
  // }

  // })

  function DisplayOneQuestion () {
    var quizInfo = content[questionIndex];
    console.log("quizInfo: ", quizInfo);

    // checks if content is not null
    if (quizInfo !== undefined && content !== undefined) {
      console.log("reached")
    
        setQuestion(quizInfo)

    
      // returns one quiz question based on index
      return (
        [<h3 id="qNumber" className="questionNumbers text-center"> Question {questionIndex + 1} </h3>,
        <Questions 
        id={questionIndex}
        i = {questionIndex} 
        question={quizInfo.question}
        answers={[quizInfo.solution, quizInfo.a2, quizInfo.a3, quizInfo.a4]}
        action={adjustStateData} 
        />]
      );
    }
  }


  // function SetIndex () {
  //   if (content !== null ) {
  //     setQuestion(content[questionIndex]);
  //     console.log(question)
  //   }
  // }

  function previousQuestion () {
    if (questionIndex !== 0) {
      
      questionIndex -= questionIndex;
    //const newData = data.concat({answer: "", correct: false});
    console.log("yuh", questionIndex)
    //setData(newData);
    
    }
  }

  function nextQuestion () {
    if (content !== null) {
    if (questionIndex !== content.length) {
      console.log("e", content[questionIndex + 1])
    var nextq = content[(questionIndex + 1)];
    setQuestion(nextq);
  
    //const newData = data.concat({answer: "", correct: false});

    console.log("yuh", nextq)
    
    }
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
        {/* {QuestionContent}  */}
        {DisplayOneQuestion()}
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
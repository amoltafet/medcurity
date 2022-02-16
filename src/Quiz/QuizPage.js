import { Button, Image, Row } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import Questions from './Questions'
import axios from 'axios';



const QuizPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [numQuestions, setNumQuestions] = useState("");
  const [currentQuestion, setQuestion] = useState([]);
  const [index, setQuestionIndex] = useState(0);
  // data array that holds question information using state
  const [data, setData] = useState([
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ]);

  let { slug } = useParams();

  useEffect(() => {
    setQuestionIndex(0);
    axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
      setContent(Object.values(response.data));
      setLoading(false);
    })

  }, [])

  useEffect(() => {
    if (!isLoading) {
      setQuestion(content[index])
    }
  })

  function DisplayOneQuestion() {
    if (!isLoading) {
      console.log("elp", currentQuestion);
      const groupID = "q-group" + index;
      // returns one quiz question based on index
      return (
        [<Questions
          id={groupID}
          i={index}
          question={currentQuestion.question}
          answers={[currentQuestion.solution, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4]}
          action={adjustStateData}
        />]
      );

    }
  }

  function previousQuestion() {
    var newIndex = index - 1;
    if (index !== 0) {
      console.log(index)
      var nextq = content[newIndex];
      setQuestion(nextq);
      setQuestionIndex(newIndex);
      console.log("yuh", nextq)
      
      if (index === 0) {
        document.getElementById("leftQuestionBttn").disabled = true;
      }
    }

  }

  function nextQuestion() {

    if (index === 0) {
      document.getElementById("leftQuestionBttn").disabled = false;
    }
    var newIndex = index + 1;
    if (newIndex !== content.length) {
      var nextq = content[newIndex];
      setQuestion(nextq);
      setQuestionIndex(newIndex);
      console.log("index: ", newIndex)

      if (newIndex === content.length) {
        document.getElementById("rightQuestionBttn").disabled = true;
      }
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

  if (isLoading) {
    return (<div></div>)
  }



  return (
    <>
      <MenuBar></MenuBar>
      <div id="quizPageContainer" className="quizBg img-fluid">
        {DisplayOneQuestion()}
        <Row>
          <Button
            id="leftQuestionBttn"
            type="submit"
            className="toggleQuestionLeft"
            onClick={() => previousQuestion()}
          >
            <Image className="leftArrow" src="/left.png"></Image>
          </Button>
          <div className="questionPosOutOfTotal text-center " id="questionPosOutOfTotal"> {index + 1} / {content.length} </div>
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
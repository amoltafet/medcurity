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

  //   useEffect(() => {
  //     if (content !== null) {
  //       setQuestion(content[0])
  //     }
  //   })
  console.log("death", content)

  // const QuestionContent = content.map((question) => {
  //     index++;
  //     //const newData = data.concat({answer: "", correct: false});

  //     console.log("yuh", question)
  //     //setData(newData);
  //     return ([
  //       <Questions
  //         i={index - 1}
  //         question={question.question}
  //         answers={[question.solution, question.a2, question.a3, question.a4]}
  //         action={adjustStateData}
  //       />
  //     ]);
  //   })



  function DisplayOneQuestion() {
    if (!isLoading) {
      console.log("elp", currentQuestion);
      // returns one quiz question based on index
      return (
        [<Questions
          id={index}
          i={index}
          question={currentQuestion.question}
          answers={[currentQuestion.solution, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4]}
          action={adjustStateData}
        />]
      );

    }
  }

  function previousQuestion(question) {
    if (index !== 0) {


    }
  }

  function nextQuestion() {
    if (index !== content.length) {
      console.log(index)
      var nextq = content[index + 1];
      setQuestion(nextq);
      var newIndex = index + 1; 
      setQuestionIndex(newIndex);

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
      <div id="quizPageContainer" className="">
        {DisplayOneQuestion()}
        <Row>
          <Button
            id="leftQuestionBttn"
            type="submit"
            className="toggleQuestionLeft disabled"
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
import { Button, Image, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import Questions from './Questions'
import axios from 'axios';



/**
* Handles main logic for quiz page. 
* @return {QuizPage}
*/
const QuizPage = () => {
  const quizClassNames = [
    ["questionNumbers text-center", "questionDesciption"],
    ["questionNumbersWrong text-center", "questionDesciptionWrong"],
    ["questionNumbersRight text-center", "questionDesciptionRight"]
  ];
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [currentQuestion, setQuestion] = useState([]);
  const [index, setQuestionIndex] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
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

  // grabs content and sets loading to false 
  useEffect(() => {
    setQuestionIndex(0);
    axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
      setContent(Object.values(response.data));
      setLoading(false);
    })

  }, [slug])


  // once content is loaded set question
  useEffect(() => {
    if (!isLoading && !isSubmitted) {
      setQuestion(content[index])
      console.log("runnn")
    }
  }, [isLoading, content, index, isSubmitted])


  /**
   * Displays the current question
   * @returns the Questions
   */
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
          classes={quizClassNames[0]}
        />]
      );

    }
  }

  /**
   * Decrements the question
   */
  function previousQuestion() {
    var newIndex = index - 1;
    if (index !== 0) {
      var nextq = content[newIndex];
      setQuestion(nextq);
      setQuestionIndex(newIndex);

      if (index === 0) {
        document.getElementById("leftQuestionBttn").disabled = true;
      }
    }

  }

  /**
 * Increments the question
 */
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

      if (newIndex === content.length || newIndex >= content.length) {
        document.getElementById("rightQuestionBttn").disabled = true;
      }
      if(index === (content.length - 1)) {
        document.getElementById("submit-btn").disabled = false;
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
    let newData = data[index];
    newData["answer"] = answer;
    if (answer === content[index].solution) {
      newData["correct"] = true
    }
    data[index] = newData;
    setData([...data]);
    console.log("" + answer);
  }
  // function to display in the console the question data stored in the data state variable in Quizpage.js
  function displayQuestionData() {
    for (var i = 0; i < content.length; i++) {
      var newData = data[i];
      console.log("selected answer: " + newData["answer"]);
    }
    setSubmitted(true);
  }

  function disabledSubmitBttn() {
     //document.getElementById("submit-btn").disabled = true;
  }

  // catch for rerendering 
  if (isLoading) {
    return (<div></div>)
  }
  if (!isSubmitted) {
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
            <div className="questionPosOutOfTotal text-center" id="questionPosOutOfTotal"> {index + 1} / {content.length} </div>
            <Button
              id="rightQuestionBttn"
              type="submit"
              className="toggleQuestionRight"
              onClick={() => nextQuestion()}>
              <Image className="rightArrow" src="/right.png"></Image>
            </Button>
          </Row>
          <SubmitButton value="Submit" questionData={data} content={content.length} action={displayQuestionData}></SubmitButton>
          {console.log("finished rendering")}  
        </div>
        {disabledSubmitBttn()}
      </>
    );
  }
  else {
    var newestIndex = 0;
    var points = 0
    var numCorrect = 0
    const QuestionContent = content.map((question) => {
      var newID = "q-group" + newestIndex
      newestIndex++;
      if (data[newestIndex - 1]["correct"] === true) {
        points += 100
        numCorrect += 1
        return ([
          <div id="resultsPageHolder" class="correct">
            <Questions
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              answers={[question.solution, question.a2, question.a3, question.a4]}
              action={adjustStateData}
              classes={quizClassNames[2]}
            />
          </div>
        ]);
      }
      else {
        return ([
          <div id="resultsPageHolder" class="wrong">
            <Questions
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              answers={[question.solution, question.a2, question.a3, question.a4]}
              action={adjustStateData}
              classes={quizClassNames[1]}
            />
          </div>
        ]);
      }
    });
    return (
      <>
        <MenuBar></MenuBar>
        <div id="resultsPageContainer">
          <h1 class="quizResultsHeader">Quiz Results</h1>
          {QuestionContent}
          <Row className="text-center quizPointInfo">
            <div> {numCorrect}/{content.length} </div>
            <div> Points: {points} </div>
            <div> {(numCorrect / content.length * 100).toFixed(2)}% </div>
          </Row>
          <Button className="quizHomeBttn uvs-left" variant="primary" href="/dash/">Home</Button>
        </div>
      </>
    );
  }
}
export default QuizPage;
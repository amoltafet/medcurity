import { Button, Image, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar';
import Questions from './Questions'
import axios from 'axios';
import Results from './Results';



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
  const [curentAnswers, setAnswers] = useState([["a", "b", "c", "d"]]);
  const [index, setQuestionIndex] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isChecked, setChecked] = useState([[false, false, false, false]])
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
    }).catch(error => console.error(`Error ${error}`));

  }, [slug])

  useEffect(() => {
    if (!isLoading && !isSubmitted) {
      initializeShuffledAnswers();
    }
  }, [isLoading, isSubmitted])

  // once content is loaded set question
  useEffect(() => {
    if (!isLoading && !isSubmitted) {
      setQuestion(content[index])
      console.log("runnn")
    }
  }, [isLoading, content, index, isSubmitted])

  function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }


  /**
   * Displays the current question
   * @returns the Questions
   */
  function DisplayOneQuestion() {
    if (!isLoading) {
      const groupID = "q-group" + index;
      // returns one quiz question based on index
      return (
        [<Questions
          id={groupID}
          i={index}
          question={currentQuestion.question}
          answers={curentAnswers[index]}
          action={adjustStateData}
          classes={quizClassNames[0]}
          checked = {isChecked[index]}
        />]
      );

    }
  }


  /**
 * Increments the question
 */
  function nextQuestion() {
    var boolChecked = false;
    for(var i = 0; i < 4; i++) {
        if(isChecked[index][i] === true) {
            boolChecked = true;
            break;
        }
    }
    if(boolChecked) {
      var newIndex = index + 1;
      if (newIndex !== content.length) {
        var nextq = content[newIndex];
        setQuestion(nextq);
        setQuestionIndex(newIndex);
        console.log("index: ", newIndex);

        if (newIndex === content.length || newIndex >= content.length) {
          document.getElementById("rightQuestionBttn").disabled = true;

        
        }
        if (newIndex === (content.length - 1)) { 
          document.getElementById("submitBtn").disabled = false;
        }
      }
    }
  }

  function initializeShuffledAnswers() {
      var bigArray = []
      var checkedArray = []
      for(var i = 0; i < content.length; i++) {
        var answerArray = [];
        answerArray.push(content[i].solution);
        answerArray.push(content[i].a2);
        answerArray.push(content[i].a3);
        answerArray.push(content[i].a4);
        answerArray = shuffleArray(answerArray);
        bigArray.push(answerArray);
        answerArray = [false, false, false, false];
        checkedArray.push(answerArray);
      }
      setAnswers(bigArray);
      setChecked(checkedArray);
  }

  /** 
   * 
   * @param {int} index Index of question that is clicked on by user
   * @param {str} answer String value of answer that was clicked on 
   * Function is used as an onChange function for the question toggle buttons to change state data
  */
  function adjustStateData(index, answer, buttonIndex) {
    let newData = data[index];
    newData["answer"] = answer;
    if (answer === content[index].solution) {
      newData["correct"] = true
    }
    data[index] = newData;
    setData([...data]);
    console.log("" + answer);

    var checkedArray = isChecked;
    checkedArray[index][buttonIndex] = true;
    setChecked(checkedArray);
  }
  // function to display in the console the question data stored in the data state variable in Quizpage.js
  function displayQuestionData() {
    for (var i = 0; i < content.length; i++) {
      var newData = data[i];
      console.log("selected answer: " + newData["answer"]);
    }
    setSubmitted(true);
  }

  // catch for rerendering 
  if (isLoading) {
    return (<div></div>)
  }
  if (!isSubmitted) {
    function disabledSubmitBttn () {
      if (document.getElementById("submitBtn") != null && index != (content.length - 1)) {
        document.getElementById("submitBtn").disabled = true;
      }
    }

    return (
      <>
        <MenuBar></MenuBar>
        <div id="quizPageContainer" className="quizBg img-fluid">
          {DisplayOneQuestion()}
          <Row className="justify-content-center">
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
          {disabledSubmitBttn()}
        </div>
      </>
    );
  }
  else {
    var newestIndex = 0;
    var points = 0
    var numCorrect = 0
    var correctIndex = 0
    const QuestionContent = content.map((question) => {
      var newID = "q-group" + newestIndex
      for(var i = 0; i < 4; i++) {
        if(data[newestIndex]["answer"] == curentAnswers[newestIndex][i]) {
          correctIndex = i;
        }
      }
      newestIndex++;
      if (data[newestIndex - 1]["correct"] === true) {
        points += 100
        numCorrect += 1
        return ([
          <div id="resultsPageHolder" class="correct">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              answers={curentAnswers[newestIndex - 1]}
              userAnswer={correctIndex}
              isCorrect = {true}
              action={adjustStateData}
              classes={quizClassNames[2]}
            />
          </div>
        ]);
      }
      else {
        return ([
          <div id="resultsPageHolder" class="wrong">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              answers={curentAnswers[newestIndex - 1]}
              userAnswer={correctIndex}
              isCorrect={false}
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
          <Row className="text-center quizPointInfo">
            <Col>
            <div className="totalCorrectQuestions"> {numCorrect} / {content.length} Questions Correct </div>
            </Col>
            <Col>
            <div className="totalCorrectPoints"> Points: {points} </div>
            </Col>
            <Col>
            <div className="correctPercentage"> {(numCorrect / content.length * 100).toFixed(2)}% </div>
            </Col>
          </Row>
          {QuestionContent}
         
          <Row>
            <Button className="quizHomeBttn uvs-left" variant="primary" href="/dash/">Home</Button></Row>
        </div>
      </>
    );
  }
}
export default QuizPage;
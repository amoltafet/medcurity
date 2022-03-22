import { Button, Image, Row, Col, Container, Alert } from 'react-bootstrap';
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
  axios.defaults.withCredentials = true;
  const quizClassNames = [
    ["questionNumbers text-center", "questionDesciption"],
    ["questionNumbersWrong text-center", "questionDesciptionWrong"],
    ["questionNumbersRight text-center", "questionDesciptionRight"]
  ];
  const [session, setSession] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [currentQuestion, setQuestion] = useState([]);
  const [curentAnswers, setAnswers] = useState([["a", "b", "c", "d"]]);
  const [index, setQuestionIndex] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isChecked, setChecked] = useState([[false, false, false, false]]);
  const [userCompletedModules, setUserCompletedModules] = useState([]);
  const [userAssignedModules, setUserAssignedModules] = useState([]);
  const [earlyCompletion, setEarlyCompletion] = useState(0);
  const [spaceLearning, setSpacedLearning] = useState(0);
  const [showSpacedLearningPopup, setShowSpacedLearningPopup] = useState(false);
  const [showEarlyCompletionPopup, setShowCompletionPopup] = useState(false);
  var points = 0;
  var numCorrect = 0;
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


  /**
   *  grabs user session to store points 
   */
  useEffect(() => {
    axios.get("http://localhost:3002/users/login").then((response) => {
      setSession(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);


  let { slug } = useParams();

  /**
   *  gets all of users module info
   */
  useEffect(() => {
    if (!isLoading && session.userid != null) {
      // I gave up 
      // axios.get('http://localhost:3002/api/getQuery',
      //   {
      //     params: { the_query: 'SELECT DISTINCT c.UserID, c.LearningModID, c.DateCompleted, a.UserID, a.LearningModID, a.DueDate FROM AssignedLearningModules a JOIN CompletedModules c WHERE c.UserID = ' + session.userid + ' OR a.UserID = ' + session.userid }
      //   }).then((response) => {
      //     console.log("re1: ", response)
      //     //setLearningModules(Object.values(response.data))
      //     //console.log("modules: ", learningModules)
      //   });
      axios.get('http://localhost:3002/api/getQuery',{
        params: { the_query: 'SELECT * FROM CompletedModules WHERE UserID = ' + session.userid }
      }).then((response) => {
        setUserCompletedModules(response.data);
        console.log("Completed", response.data);
      });
      axios.get('http://localhost:3002/api/getQuery',{
        params: { the_query: 'SELECT * FROM AssignedLearningModules WHERE UserID = ' + session.userid }
      }).then((response) => {
        setUserAssignedModules(response.data); 
        console.log("Assigned: ", response.data);
      });
      // axios.post("http://localhost:3002/testing/resetUser", {
      //   userid: session.userid,
      // }).then((response) => {
      //   console.log("response", response);
      // }).catch(error => console.log(`Error ${error}`));
      // axios.post("http://localhost:3002/testing/assignModules", {
      //     userid: session.userid, 
      //     modulenum: 5,
      //     daysaway: 6,
      //   }).then((response) => {
      //     console.log("response", response);
      //   }).catch(error => console.log(`Error ${error}`));
    }
   
    

  }, [isLoading, session.userid])

  /**
   *  grabs content and sets loading to false 
   */
  useEffect(() => {
    setQuestionIndex(0);
    axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
      setContent(Object.values(response.data))
      setLoading(false);
    }).catch(error => console.error(`Error ${error}`));

  }, [slug])

  /**
   *  once content is loaded shuffles & sets  question
   */
  useEffect(() => {
    if (!isLoading && !isSubmitted) {
      initializeShuffledAnswers();
      setQuestion(content[index])
    }
  }, [isLoading, content, index, isSubmitted])

  /**
   *  sets module complete, removes from assigned & updates points 
   */
  useEffect(() => {
    if (!isLoading && isSubmitted && points !== 0) {
      var categoryName = "category" + slug;
      var percentName = "percentage" + slug;
      var percent = numCorrect / content.length;
      if ((percent * 100) >= 60) {
        console.log("percent: ", percent);
        console.log("points: ", points);
        axios.post("http://localhost:3002/users/quiz", {
          categoryName: categoryName,
          points: points,
          percentName: percentName,
          lengths: (percent),
          userid: session.userid,
        }).then((response) => {
          console.log("response", response);
        }).catch(error => console.log(`Error ${error}`));
        axios.post("http://localhost:3002/users/moduleCompleted", {
          categoryId: slug,
          userid: session.userid,
        }).then((response) => {
          console.log("response", response.data);
        }).catch(error => console.log(`Error ${error}`));
      }
    }
  }, [points, numCorrect, isSubmitted])

  /**
   *  shuffles the question answers
   * @returns the shuffled answers 
   */
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
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
      return (
        [<Questions
          id={groupID}
          i={index}
          question={currentQuestion.question}
          answers={curentAnswers[index]}
          action={adjustStateData}
          classes={quizClassNames[0]}
          checked={isChecked[index]}
        />]
      );

    }
  }
  /**
   * Increments the question
   */
  function nextQuestion() {
    var boolChecked = false;
    for (var i = 0; i < 4; i++) {
      if (isChecked[index][i] === true) {
        boolChecked = true;
        break;
      }
    }
    if (boolChecked) {
      var newIndex = index + 1;
      if (newIndex !== content.length) {
        var nextq = content[newIndex];
        setQuestion(nextq);
        setQuestionIndex(newIndex);

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
    for (var i = 0; i < content.length; i++) {
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

    var checkedArray = isChecked;
    checkedArray[index][buttonIndex] = true;
    setChecked(checkedArray);
  }

  /**
   *  sees if the user can get bonus points through early completion or spaced learning
   */
  function checkIfUserGetsExtraPoints() {
    var today = new Date(); 
    var twoDaysEarly = new Date();
    var oneDayEarly = new Date();
    twoDaysEarly.setDate(twoDaysEarly.getDate() - 2);
    oneDayEarly.setDate(oneDayEarly.getDate() - 1);

        console.log("today: ", today);
        console.log("two days early: ", twoDaysEarly);
        console.log("one day early: ", oneDayEarly);
      
    userAssignedModules.forEach(element => {
      console.log("module id: ", element.LearningModID);
      console.log("slug ", slug);
      if (element.LearningModID === slug) {
        console.log("module due at: ", element.DueDate);
        console.log("slug ", slug);
        
          if (element.DueDate < twoDaysEarly.toISOString()) {
            setEarlyCompletion(200);
            console.log("yay early completion 2x early+: ", 200);
          }
          else if (element.DueDate < oneDayEarly.toISOString()) {
            setEarlyCompletion(100);
            console.log("yay early completion 1x early+:", 100);
          }         
      }
    });

    // datetime
    var lastCompletedModuleDate = userCompletedModules.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b)); 
    lastCompletedModuleDate = (lastCompletedModuleDate.DateCompleted);
    var moduleFinishedDate = new Date(lastCompletedModuleDate);
    console.log("last completed module date : ", lastCompletedModuleDate);
    console.log("last completed module date converted: ", moduleFinishedDate);
    
    var spacedLearningDate = new Date(lastCompletedModuleDate);
    spacedLearningDate.setDate(spacedLearningDate.getDate() + 2);
    console.log("spaced learning date: ", spacedLearningDate);

    const msBetweenDates = Math.abs(moduleFinishedDate.getTime() - spacedLearningDate.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    
    if (hoursBetweenDates < 24) {
      setSpacedLearning(300);
      console.log("yay spaced learning+:", 300);
    }
    setSubmitted(true);
  }

  function UserGotEarlyCompletion() {
    if (showEarlyCompletionPopup) {
      return (
        <Alert variant="info" onClose={() => setShowCompletionPopup(false)} dismissible>
          <Alert.Heading>ay You Got Bonus Points!</Alert.Heading>
          <p>
            You scored bonus points by completing your module early! +${earlyCompletion}
          </p>
        </Alert>
      );
    }
  }

  function UserGotSpacedLearning() {
    if (showSpacedLearningPopup) {
      return (
        <Alert variant="info" onClose={() => setShowSpacedLearningPopup(false)} dismissible>
          <Alert.Heading>Yay You Got Bonus Points!</Alert.Heading>
          <p>
            You scored bonus points by spacing out your learning! + ${spaceLearning}
          </p>
        </Alert>
      );
    }
  }

  // catch for rerendering 
  if (isLoading) {
    return (<div></div>)
  }
  if (!isSubmitted) {
    function disabledSubmitBttn() {
      if (document.getElementById("submitBtn") !== null && index !== (content.length - 1)) {
        document.getElementById("submitBtn").disabled = true;
      }
    }



    return (
      <>
        <MenuBar></MenuBar>
        <div id="quizPageContainer" className="quizBg img-fluid text-center">
          <div className="questionPosOutOfTotal text-center" id="questionPosOutOfTotal"> {index + 1} / {content.length} </div>
          {DisplayOneQuestion()}
          <Button
            id="rightQuestionBttn"
            type="submit"
            className=" toggleQuestionRight"
            onClick={() => nextQuestion()}>
            <Image className="rightArrow" src="/right.png"></Image>
          </Button>
          <SubmitButton value="Submit" questionData={data} content={content.length} action={checkIfUserGetsExtraPoints}></SubmitButton>
          {disabledSubmitBttn()}
        </div>
      </>
    );
  }
  else {
    var newestIndex = 0;


    var correctIndex = 0
    const QuestionContent = content.map((question) => {
      var newID = "q-group" + newestIndex
      for (var i = 0; i < 4; i++) {
        if (data[newestIndex]["answer"] === curentAnswers[newestIndex][i]) {
          correctIndex = i;
        }
      }
      newestIndex++;
      if (data[newestIndex - 1]["correct"] === true) {
        if (slug === 6) {
          points += 500
        }

        points += 100
        numCorrect += 1
        return ([
          <Container id="resultsPageHolder" class="resultAnswers">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              answers={curentAnswers[newestIndex - 1]}
              userAnswer={correctIndex}
              isCorrect={true}
              action={adjustStateData}
              classes={quizClassNames[2]}
            />
          </Container>
        ]);
      }
      else {
        return ([
          <Container id="resultsPageHolder" class="resultAnswers">
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
          </Container>
        ]);
      }
    });
    return (
      <>
        <MenuBar></MenuBar>
        <div id="resultsPageContainer">
          {UserGotEarlyCompletion()}
          {UserGotSpacedLearning()}
          <h1 className="quizResultsHeader">Quiz Results</h1>
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
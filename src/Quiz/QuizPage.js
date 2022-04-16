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
    ["questionNumbers", "questionDesciption"],
    ["questionNumbersWrong text-left", "questionDesciptionWrong "],
    ["questionNumbersRight text-left", "questionDesciptionRight "]
  ];
  const [currentUser, setCurrentUser] = useState([]);
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
  const [passed, setPassed] = useState(false);
  const [notCompleteOnTime, setNoCompleteOnTime] = useState(0);
  const [showSpacedLearningPopup, setShowSpacedLearningPopup] = useState(false);
  const [showEarlyCompletionPopup, setShowEarlyCompletionPopup] = useState(false);
  const [showPassedPopup, setShowPassedPopup] = useState(true);
  const [showUserDidNotCompleteOnTime, setShowUserDidNotCompleteOnTime] = useState(false);
  const [moduleNotAssigned, setModuleNotAssigned] = useState(false);
  const [moduleName, setModuleName] = useState("");
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
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);

  let { slug } = useParams();

  /**
   *  gets all of users module info
   */
  useEffect(() => {
    if (!isLoading && currentUser.userid != null) {
		axios.get('http://localhost:3002/api/getQuery',{
			params: { the_query: 'SELECT * FROM CompletedModules WHERE UserID = ' + currentUser.userid }
		}).then((response) => {
			setUserCompletedModules(response.data);
			console.log("user Completed", response.data);
		});
		axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
			{ params: { userid: currentUser.userid }
		}).then((response) => {
			setUserAssignedModules(response.data)
			console.log("user Assigned: ", response.data);
		}).catch(error => console.error(`Error ${error}`));
		axios.get('http://localhost:3002/api/getQuery',{
			params: { the_query: 'SELECT * FROM LearningModules WHERE ID = ' + slug }
		}).then((response) => {
			setModuleName(response.data); 
			console.log("ModuleName: ", response.data);
		});	

      // KEEP FOR TESTING!!

      axios.get('http://localhost:3002/api/getQuery',{
        params: { the_query: 'SELECT * FROM UserPoints '}
      }).then((response) => {
     
        console.log("Points: ", response.data);
      });	

      axios.get('http://localhost:3002/api/getQuery',{
        params: { the_query: 'SELECT * FROM CompletedModules '}
      }).then((response) => {
     
        console.log("All completed Modules: ", response.data);
      });	

      // Quiz Answers 

      content.forEach(element => {
      	console.log(element.solution)
      });

      //rests users stats

      // axios.post("http://localhost:3002/testing/resetUser", {
      //   userid: currentUser.userid,
      // }).then((response) => {
      //   console.log("response", response);
      // }).catch(error => console.log(`Error ${error}`));

      //assigns modules

      // axios.post("http://localhost:3002/testing/assignModules", {
      //     companyid: 24, 
      //     modulenum: 85,
      //     daysaway: 7,
      //   }).then((response) => {
      //     console.log("response", response);
      //   }).catch(error => console.log(`Error ${error}`));

      //adds completed modules 

      // axios.post("http://localhost:3002/testing/fillCompletedModules", {
      //   userid: currentUser.userid,
      //   modulenum: 3,
      //   daysaway: 2,
      // }).then((response) => {
      //   console.log("response", response);
      // }).catch(error => console.log(`Error ${error}`));

      //assigns company 

      // axios.post("http://localhost:3002/testing/addCompany", {
      //   userid: currentUser.userid,
      //   companyid: 24,
      // }).then((response) => {
      //   console.log("response", response);
      // }).catch(error => console.log(`Error ${error}`));

      //makes user an admin
      // axios.post("http://localhost:3002/testing/makeAdmin", {
      //   userid: currentUser.userid,
      //   companyid: currentUser.companyid,
      // }).then((response) => {
      //   console.log("response", response);
      // }).catch(error => console.log(`Error ${error}`));
    

    }
  }, [isLoading, currentUser.userid, slug])

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
      var totalPoints = points + earlyCompletion + notCompleteOnTime + spaceLearning;
      var percent = numCorrect / content.length;
      if ((percent * 100) >= 60 && !moduleNotAssigned) {
        console.log("percent: ", percent);
        console.log("points: ", totalPoints);
        axios.post("http://localhost:3002/users/moduleCompleted", {
          categoryId: slug,
          userid: currentUser.userid,
          points: totalPoints,
          percentage: percent,
        }).then((response) => {
          console.log("response", response.data);
        }).catch(error => console.log(`Error ${error}`));
        setPassed(true)
      }
    }
  }, [points, numCorrect, isSubmitted, content.length, currentUser.userid, earlyCompletion, isLoading, moduleNotAssigned, notCompleteOnTime, slug, spaceLearning])

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
          document.getElementById("submitBtn").className = "quizSubmitBttn uvs-left";
          document.getElementById("rightQuestionBttn").className = "rightQuestionBttnRemoved"

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
   * checks if the module was completed on time. 
   * @param {Obj} currentModule
   * @returns true if the user completed the module on time.  
   */
  function checkIfUserCompletedModuleOnTime (currentModule) {
    var today = new Date(); 
    var moduleDueDate;
    try {
      moduleDueDate = new Date(currentModule.DueDate);
      moduleDueDate.setDate(moduleDueDate.getDate())
      if (today > moduleDueDate) {
        setNoCompleteOnTime(-200);
        console.log("Boo complete your module on time: -", 200);
        setShowUserDidNotCompleteOnTime(true);
        return false;
      }
      return true;
    }
    catch (e){
      console.log("Module not assigned: ", e);
      setModuleNotAssigned(true);
      return false;
    }
    
  }

  /**
   *  checks if the user completed the module early 
   * @param {Obj} currentModule
   */
  function checkIfUserGotEarlyCompletion (currentModule) {
    var today = new Date(); 
    var twoDaysEarly = new Date(currentModule.DueDate);
    var oneDayEarly = new Date(currentModule.DueDate);
    twoDaysEarly.setDate(twoDaysEarly.getDate() - 2);
    oneDayEarly.setDate(oneDayEarly.getDate() - 1);

        console.log("due date for module: ", currentModule.DueDate);
        console.log("two days early: ", twoDaysEarly);
        console.log("one day early: ", oneDayEarly);

        const msBetweenOneDay = Math.abs(today.getTime() - oneDayEarly.getTime());
        const hoursBetweenOneDay = msBetweenOneDay / (60 * 60 * 1000);

    if (today <= twoDaysEarly) {
      setEarlyCompletion(200);
      console.log("yay early completion 2x early+: ", 200);
      setShowEarlyCompletionPopup(true);
    }
    else if ((today <= oneDayEarly || hoursBetweenOneDay < 24) && earlyCompletion === 0  ) {
      setEarlyCompletion(100);
      console.log("yay early completion 1x early+:", 100);
      setShowEarlyCompletionPopup(true);
    }         
  }

  /**
   *  checks if the user got spaced learning by spacing of 2 days 
   */
  function checkIfUserGotSpacedLearning () {
    var today = new Date(); 
    if (userCompletedModules.length !== 0 && userCompletedModules !== undefined && notCompleteOnTime === 0) {
      var lastCompletedModule = userCompletedModules.reduce((a, b) => (a.MeasureDate < b.MeasureDate ? a : b));
   
    
      lastCompletedModule = (lastCompletedModule.DateCompleted);
      var lastCompletedModuleDate = new Date(lastCompletedModule);
      lastCompletedModuleDate.setDate(lastCompletedModuleDate.getDate() + 1);
      console.log("last completed module date converted: ", lastCompletedModuleDate);
      
      var spacedLearningDate = new Date(lastCompletedModuleDate);
      spacedLearningDate.setDate(spacedLearningDate.getDate() + 2);
      console.log("spaced learning date: ", spacedLearningDate);

      const msBetweenDates = Math.abs(today.getTime() - spacedLearningDate.getTime());
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
      
      if (hoursBetweenDates < 24 && hoursBetweenDates < 1) {
        setSpacedLearning(300);
        console.log("yay spaced learning+:", 300);
        setShowSpacedLearningPopup(true);
      }
    }
  }

  /**
   *  holder for gamification extra points. 
   */
  function checkIfUserGetsExtraPoints () { 
    var currentModule;
    
    userAssignedModules.forEach(element => {
      if (element.LearningModID === parseInt(slug)) {
        currentModule = element;
      }
    
    });
  
    console.log("CurrentModule", currentModule);
    if (checkIfUserCompletedModuleOnTime(currentModule)) {
        checkIfUserGotEarlyCompletion(currentModule);
        checkIfUserGotSpacedLearning();
    }
    setSubmitted(true);
  }

  /**
   *  shows popup if user got early completion.
   */
  function UserGotEarlyCompletion() {
    if (showEarlyCompletionPopup) {
      return (
        <Alert variant="success" show={showEarlyCompletionPopup}>
          <Alert.Heading>Yay, You Got Bonus Points!</Alert.Heading>
          <p>
            You scored bonus points by completing your module early! +{earlyCompletion} points!
          </p>
          <div className="d-flex justify-content-end">
          <Button onClick={() => setShowEarlyCompletionPopup(false)} variant="outline-success">
            X
          </Button>
          </div>
        </Alert>
      );
    }
  }

  /**
   *  shows popup if user got spaced learning. 
   */
  function UserGotSpacedLearning() {
    if (showSpacedLearningPopup) {
      return (
        <Alert variant="success" show={showSpacedLearningPopup}>
          <Alert.Heading>Yay, You Got Bonus Points!</Alert.Heading>
          <p>
            You scored bonus points by spacing out your learning! +{spaceLearning} points!
          </p>
          <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSpacedLearningPopup(false)} variant="outline-success">
            X
          </Button>
          </div>
        </Alert>
      );
    }
  }

  /**
   *  shows popup if user did not complete the module on time. 
   */
  function UserDidNotCompleteModuleOnTime() {
    if (showUserDidNotCompleteOnTime) {
      return (
        <Alert variant="danger" show={showUserDidNotCompleteOnTime}>
          <Alert.Heading>You Did Not Complete the Module on Time.</Alert.Heading>
          <p>
            You did not complete this module by its due date. -${notCompleteOnTime} points.
          </p>
          <div className="d-flex justify-content-end">
          <Button onClick={() => setShowUserDidNotCompleteOnTime(false)} variant="outline-danger">
            X
          </Button>
          </div>
        </Alert>
      );
    }
  }

  /**
   *  shows popup to tell user if they passed the module or neeed to retake it. 
   */
  function Passed () {
    console.log("module not assigned:", moduleNotAssigned)
    if (!moduleNotAssigned){
      if (passed) {
        return (
          <Alert variant="success" show={showPassedPopup}>
            <Alert.Heading>Yay, You Passed the Module!</Alert.Heading>
            <p>
              Congratulations you passed the {moduleName.Title} module!
            </p>
            <div className="d-flex justify-content-end">
            <Button onClick={() => setShowPassedPopup(false)} variant="outline-success">
              X
            </Button>
            </div>
          </Alert>
        );
      } else {
        return (
          <Alert variant="dark" show={showPassedPopup}>
            <Alert.Heading>Try again</Alert.Heading>
            <p>
              Sorry you did not pass the Module. You need higher than a 60 to pass.
            </p>
            <div className="d-flex justify-content-end">
            <Button href={`/quiz/${slug}`} variant="outline-dark">
              Try Again
            </Button>
            <Button onClick={() => setShowPassedPopup(false)} variant="outline-dark">
              X
            </Button>
            </div>
          </Alert>
        );
      }  
    }
  }

  // catch for rerendering 
  if (isLoading) {
    return (<div></div>)
  }
  if (!isSubmitted) {
    function disabledSubmitBttn() {
      if (document.getElementById("submitBtn") !== null && index !== (content.length - 1)) {
        document.getElementById("submitBtn").className = "quizSubmitBttnRemoved";
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
          <Container id="resultsPageHolder" className="resultAnswers uvs-left uvs-right">
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
          <Container id="resultsPageHolder" className="resultAnswers uvs-left uvs-right">
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
         
          <h1 className="quizResultsHeader">Quiz Results</h1> {
          Passed()}
          {UserGotEarlyCompletion()}
          {UserGotSpacedLearning()}
          {UserDidNotCompleteModuleOnTime()}
          <Row className="text-center quizPointInfo">
            <Col>
              <div className="totalCorrectQuestions"> {numCorrect} / {content.length} Questions Correct </div>
            </Col>
            <Col>
              <div className="totalCorrectPoints"> Points: {points + earlyCompletion + notCompleteOnTime + spaceLearning} </div>
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
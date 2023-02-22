import { Image, Row, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from '../MenuBar/MenuBar';
import QuizProgressBar from './QuizProgressBar';
import Questions from './Questions';
import axios from 'axios';
import Results from './Results';
// import env from "react-dotenv";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Paper, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ResultAlerts from './ResultAlerts';
import Alert from '@mui/material/Alert';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
/**
* Handles main logic for quiz page. 
* @return {QuizPage}
*/
const QuizPage = () => {
  // screen height and width
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  axios.defaults.withCredentials = true;
  const quizClassNames = [
    ["questionNumbers", "questionDesciption"],
    ["questionNumbersWrong text-left", "questionDesciptionWrong "],
    ["questionNumbersRight text-left", "questionDesciptionRight "]
  ];
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]); // "content" is an array of each question's table data for the current module
  const [matchingAnswersContent, setMatchingAnswersContent] = useState([]); // used specifically for matching questions and the "MatchingAnswers" table
  const [currentQuestion, setQuestion] = useState([]);
  const [currentAnswers, setAnswers] = useState([["a", "b", "c", "d"]]);
  const [currentMatchingAnswers, setMatchingAnswers] = useState([["w", "x", "y", "z"]]);
  const [index, setQuestionIndex] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isChecked, setChecked] = useState([[false, false, false, false]]);
  const [userCompletedModules, setUserCompletedModules] = useState([]);
  const [userAssignedModules, setUserAssignedModules] = useState([]);
  const [earlyCompletion, setEarlyCompletion] = useState(0);
  const [spaceLearning, setSpacedLearning] = useState(0); 
  const [passed, setPassed] = useState(false);
  const [timeBonusEarned, setTimeBonusEarned] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);
  const [notCompleteOnTime, setNoCompleteOnTime] = useState(0);
  const [showSpacedLearningPopup, setShowSpacedLearningPopup] = useState(false);
  const [showEarlyCompletionPopup, setShowEarlyCompletionPopup] = useState(false);
  const [showPassedPopup, setShowPassedPopup] = useState(true);
  const [showTimeBonusPopup, setShowTimeBonusPopup] = useState(true);
  const [showUserDidNotCompleteOnTime, setShowUserDidNotCompleteOnTime] = useState(false);
  const [moduleNotAssigned, setModuleNotAssigned] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [companyid, setCompanyID] = useState([]);
  const intervalRef = useRef();
  var secondsRef = useRef();
  var points = 0;
  var numCorrect = 0;
  // "data" is an array of the user's performance on each question
  const [data, setData] = useState([
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
    { answer: "", correct: false, color: "gray", type : ""},
  ]);

  /**
   *  grabs user session to store points 
   */
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
      setCurrentUser(response.data.user[0])
    }).catch(error => console.error(`Error ${error}`));
  }, []);

  let { slug } = useParams();

  /**
   *  gets all of users module info
   */
  useEffect(() => {
    if (!isLoading && currentUser.userid != null) {
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,{
			params: { the_query: 'SELECT * FROM CompletedModules WHERE UserID = ' + currentUser.userid }
		}).then((response) => {
			setUserCompletedModules(response.data);
		});
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/getAllUserRequiredModules`, 
			{ params: { userid: currentUser.userid }
		}).then((response) => {
			setUserAssignedModules(response.data)
		}).catch(error => console.error(`Error ${error}`));
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,{
			params: { the_query: 'SELECT * FROM LearningModules WHERE ID = ' + slug }
		}).then((response) => {
			setModuleName(response.data); 
		});	
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`,{
			params: { the_query: 'SELECT * FROM AffiliatedUsers WHERE UserID = ' + currentUser.userid }
		}).then((response) => {
			setCompanyID(response.data[0]); 
		});	

      // KEEP FOR TESTING!!
      // content.forEach(element => {
      // 	console.log(element.solution)
      // });

      //rests users stats

      // axios.post("${process.env.REACT_APP_BASE_URL}/testing/resetUser", {
      //   userid: currentUser.userid,
      // }).then((response) => {
      //   // console.log("response", response);
      // }).catch(error => // console.log(`Error ${error}`));

      //assigns modules

      // axios.post("${process.env.REACT_APP_BASE_URL}/testing/assignModules", {
      //     companyid: 24, 
      //     modulenum: 85,
      //     daysaway: 4,
      //   }).then((response) => {
      //     // console.log("response", response);
      //   }).catch(error => // console.log(`Error ${error}`));

      //adds completed modules 

      // axios.post("${process.env.REACT_APP_BASE_URL}/testing/fillCompletedModules", {
      //   userid: currentUser.userid,
      //   modulenum: 2,
      //   daysaway: 2,
      //   points: 800, 
      //   percentage: 1,
      //   companyid: 24,
      // }).then((response) => {
      //   // console.log("response", response);
      // }).catch(error => // console.log(`Error ${error}`));

      //assigns company 

      // axios.post("${process.env.REACT_APP_BASE_URL}/testing/addCompany", {
      //   userid: currentUser.userid,
      //   companyid: 24,
      // }).then((response) => {
      //   // console.log("response", response);
      // }).catch(error => // console.log(`Error ${error}`));

      //makes user an admin

      // axios.post("${process.env.REACT_APP_BASE_URL}/testing/makeAdmin", {
      //   userid: currentUser.userid,
      //   companyid: 24,
      // }).then((response) => {
      //   // console.log("response", response);
      // }).catch(error => // console.log(`Error ${error}`));
    }
  }, [isLoading, currentUser.userid, slug])

  /**
   *  grabs content and sets loading to false 
   */
  useEffect(() => {
    setQuestionIndex(0);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getMatchingAnswers`, { params: { id: slug } }).then((response) => {
      setMatchingAnswersContent(Object.values(response.data))
    }).catch(error => console.error(`Error ${error}`));
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getModuleQuestions`, { params: { id: slug } }).then((response) => {
      setContent(Object.values(response.data))
      setLoading(false);
      secondsRef.current = 0.0;
      const id = setInterval(() => {secondsRef.current += 0.1; }, 100);
      intervalRef.current = id;
    }).catch(error => console.error(`Error ${error}`));
  }, [slug])

  /**
   *  once content is loaded, shuffles the answers for each question & sets the first question
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
    if (!isLoading && isSubmitted) {
      clearInterval(intervalRef.current);
      let seconds = Math.round(secondsRef.current * 10) / 10;
      let totalPoints = points + earlyCompletion + notCompleteOnTime + spaceLearning + timeBonus;
      let percent = numCorrect / content.length;

      // this is the set cutoff for the percentage questions correct a user needs to earn the time bonus
      if ((percent * 100) <= moduleName[0].timebonuscutoff) {
        setTimeBonus(0);
        setTimeBonusEarned(false);
      }
      else {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/namedBadgeEarned`, {
          userid: currentUser.userid,
          badgeName: "Sprinter Badge",
        }).then((response) => {
          console.log("response", response.data);
        }).catch((err) => console.log(err));
      }

      axios.post(`${process.env.REACT_APP_BASE_URL}/users/moduleActivity`, {
        userid: currentUser.userid,
        module: slug,
        points: totalPoints,
        percentage: percent,
        time: seconds
      }).then((response) => {
        // console.log(response.message);
      }).catch();

      if ((percent * 100) >= moduleName[0].badgecutoff) {
        console.log(moduleName)
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/moduleBadgeEarned`, {
          userid: currentUser.userid,
          modulenum: slug,
          moduleName: moduleName[0].Title
        }).then((response) => {
          console.log("response", response.data);
        }).catch((err) => console.log(err));
      }

      if ((percent * 100) >= 60 && !moduleNotAssigned) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/moduleCompleted`, {
          categoryId: slug,
          userid: currentUser.userid,
          points: totalPoints,
          percentage: percent,
          modulenum: slug, 
          companyid: companyid.CompanyID,
        }).then((response) => {
          // console.log("response", response.data);
        }).catch() // console.log(`Error ${error}`));
        setPassed(true);
        return;
      }
      setShowEarlyCompletionPopup(false);
      setShowSpacedLearningPopup(false);
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
          answers={currentAnswers[index]}
          matchinganswers={currentMatchingAnswers[index]}
          action={adjustStateData}
          classes={quizClassNames[0]}
          checked={isChecked[index]}
          type={currentQuestion.type}
        />]
      );

    }
  }

  /**
   * Increments the question
   */
  function nextQuestion() {
    var boolChecked = false;
    for (var i = 0; i < isChecked[index].length; i++) {
      if (isChecked[index][i] === true) {
        boolChecked = true;
        break;
      }
    }
    if (boolChecked) {
      let newData = data[index];
      console.log("newData", newData);
      if (newData["answer"] === content[index].solution && newData["type"] === "mc") {
        newData["color"] = "green"
      } else if (newData["answer"] !== content[index].solution && newData["type"] === "mc") {
        newData["color"] = "red"
      } else {
        newData["color"] = "gray"
      }
      setData([...data, newData])
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
          document.getElementById("submitBtn").disabled = true;
          document.getElementById("rightQuestionBttn").className = "rightQuestionBttnRemoved";
        }
      }
    }
  }

  function initializeShuffledAnswers() {
    var allAnswersArray = []
    var allMatchingAnswersArray = []
    var checkedArray = []
    for (var i = 0; i < content.length; i++) {
      var answerArray = [];
      var matchingAnswerArray = [];
      answerArray.push(content[i].solution);
      if (content[i].type === 'mc' || content[i].type === 'match') { // fill-in-the-blank only requires solution, multiple choice and matching need the other answer choices
        answerArray.push(content[i].a2);
        answerArray.push(content[i].a3);
        answerArray.push(content[i].a4);
        answerArray = shuffleArray(answerArray);
      }
      allAnswersArray.push(answerArray);
      if (content[i].type === 'match') {
        var maObject = matchingAnswersContent.find((o) => o.matchingquestionid === content[i].questionid);
        matchingAnswerArray.push(maObject.m1);
        matchingAnswerArray.push(maObject.m2);
        matchingAnswerArray.push(maObject.m3);
        matchingAnswerArray.push(maObject.m4);
        matchingAnswerArray = shuffleArray(matchingAnswerArray);
      }
      allMatchingAnswersArray.push(matchingAnswerArray);
      if (content[i].type === 'mc') { // same logic with keeping track of what's checked or filled-in
        checkedArray.push([false, false, false, false]);
      } else if (content[i].type === 'fill') {
        checkedArray.push([false]);
      } else if (content[i].type === 'match') { // though matching questions will auto "check", since the user could theoretically not want to make any changes
        checkedArray.push([true]);
      }
    }
    setAnswers(allAnswersArray);
    setMatchingAnswers(allMatchingAnswersArray);
    setChecked(checkedArray);
  }

  /**
   * Used to score the user's answer to a matching question
  */
 function assessMatchingTypeAnswer(answerList, matchingAnswerList) {
  var maObject = matchingAnswersContent.find((o) => o.matchingquestionid === content[index].questionid);
  if (answerList.indexOf(content[index].solution) !== matchingAnswerList.indexOf(maObject.m1)
      || answerList.indexOf(content[index].a2) !== matchingAnswerList.indexOf(maObject.m2)
      || answerList.indexOf(content[index].a3) !== matchingAnswerList.indexOf(maObject.m3)
      || answerList.indexOf(content[index].a4) !== matchingAnswerList.indexOf(maObject.m4)) {
        return false; // incorrect
  }
  return true; // correct
 }

   /**
   * Used to find the number of correctly matched answers to a matching question
  */
    function numberCorrectMatches(answerList, matchingAnswerList) {
      var maObject = matchingAnswersContent.find((o) => o.matchingquestionid === content[index].questionid);
      let numCorrectMatches = 0;
      if (answerList.indexOf(content[index].solution) === matchingAnswerList.indexOf(maObject.m1)) {
        numCorrectMatches += 1;
      }
      if (answerList.indexOf(content[index].a2) === matchingAnswerList.indexOf(maObject.m2)) {
        numCorrectMatches += 1;
      }
      if (answerList.indexOf(content[index].a3) === matchingAnswerList.indexOf(maObject.m3)) {
        numCorrectMatches += 1;
      }
      if (answerList.indexOf(content[index].a4) === matchingAnswerList.indexOf(maObject.m4)) {
        numCorrectMatches += 1;
      }
      return numCorrectMatches; // correct
  }

  /** 
   * 
   * @param {int} index Index of current question
   * @param {str} answer String value of answer that was clicked on or typed in
   * Function is used as an onChange function for the question toggle buttons / text field to change state data
  */
  function adjustStateData(index, answer, inputIndex) {
    let newData = data[index];
    if (content[index].type === 'fill') {
      newData["answer"] = answer.toLowerCase(); // fill-in-the-blank solutions in the questions table are lower-case
    } else {
      newData["answer"] = answer;
    }
    if (content[index].type === 'match') {
      newData["correct"] = assessMatchingTypeAnswer(answer[0], answer[1]);
      newData["numberMatched"] = numberCorrectMatches(answer[0], answer[1]);
    } else {
      if (newData["answer"] === content[index].solution) {
        newData["correct"] = true
        newData["type"] = content[index].type
      } else {
        newData["correct"] = false
        newData["type"] = content[index].type
      }
    }
    data[index] = newData;
    setData([...data]);

    var checkedArray = isChecked;
    if (answer === "") { // making sure that the user has an inputted fill-in-the-blank answer before they can move on
      checkedArray[index][inputIndex] = false;
      document.getElementById("submitBtn").disabled = true;
    } else {
      checkedArray[index][inputIndex] = true;
      document.getElementById("submitBtn").disabled = false;
      
    }
    setChecked(checkedArray); 
    console.log(data);
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
      moduleDueDate.setDate(moduleDueDate.getDate());
      if (today > moduleDueDate) {
        setNoCompleteOnTime(-200);
        setShowUserDidNotCompleteOnTime(true);
        return false;
      }
      return true;
    }
    catch (e) {
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

        const msBetweenOneDay = Math.abs(today.getTime() - oneDayEarly.getTime());
        const hoursBetweenOneDay = msBetweenOneDay / (60 * 60 * 1000);

    if (today <= twoDaysEarly) {
      setEarlyCompletion(200);
      setShowEarlyCompletionPopup(true);
    }
    else if ((today <= oneDayEarly || hoursBetweenOneDay < 24) && earlyCompletion === 0  ) {
      setEarlyCompletion(100);
      setShowEarlyCompletionPopup(true);
    }         
  }

  /**
   *  checks if the user got the time bonus
   * @param {Obj} currentModule
   */
  function checkIfUserGotTimeBonus (currentModule) {
    let seconds = secondsRef.current;
    // let cutoff = 0.0;
    // content.forEach((question) => {
    //   if (question.type === 'mc') {
    //     cutoff += 5
    //   } else if (question.type === 'match') {
    //     cutoff += 10
    //   } else {
    //     cutoff += 5
    //   }
    // });

    if (seconds < moduleName[0].timecutoff) {
      setTimeBonus(100);
      setTimeBonusEarned(true);
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
      lastCompletedModuleDate.setDate(lastCompletedModuleDate.getDate());
      
      var spacedLearningDate = new Date(lastCompletedModuleDate);
      spacedLearningDate.setDate(spacedLearningDate.getDate() + 2);

      const msBetweenDates = Math.abs(today.getTime() - spacedLearningDate.getTime());
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
      
      if (hoursBetweenDates < 24 && hoursBetweenDates < 1) {
        setSpacedLearning(300);
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
  
    checkIfUserGotTimeBonus(currentModule);
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
    const title = "Yay, You Got Bonus Points!";
    const message = "You scored bonus points by spacing out your learning!";
    const points = "+" + earlyCompletion + " points!";
    if (showEarlyCompletionPopup) {
      return (
        <ResultAlerts title={title} message={message} points={points} show={showEarlyCompletionPopup} setShow={setShowEarlyCompletionPopup} variant="info"/>
      );
    }
  }

  /**
   *  shows popup if user got spaced learning. 
   */
  function UserGotSpacedLearning() {
    const title = "Yay, You Got Bonus Points!";
    const message = "You scored bonus points by spacing out your learning!";
    const points = "+" + spaceLearning + " points!";
    if (showSpacedLearningPopup) {
      return (
          <ResultAlerts title={title} message={message} points={points} show={showSpacedLearningPopup} setShow={setShowSpacedLearningPopup} variant="info"/>
      );
    }
  }

  /**
   *  shows popup if user did not complete the module on time. 
   */
  function UserDidNotCompleteModuleOnTime() {
    const title = "You Did Not Complete the Module on Time.";
    const message = "You did not complete this module by its due date. ";
    const points = notCompleteOnTime + " points.";
    if (showUserDidNotCompleteOnTime) {
      return (
          <ResultAlerts title={title} message={message} points={points} show={showUserDidNotCompleteOnTime} setShow={setShowUserDidNotCompleteOnTime} variant="error"/>
      );
    }
  }

  /**
   *  shows popup to tell user if they passed the module or neeed to retake it. 
   */
  function Passed () {
    const title = "You Passed the Module!";
    const message = "Congratulations you passed the " + moduleName.Title + " module!";
    const points = "";
    if (!moduleNotAssigned){
      if (passed) {
        return (
             <ResultAlerts title={title} message={message} points={points} show={showPassedPopup} setShow={setShowPassedPopup} variant="success"/>
        );
      } else {
        return (
          <ResultAlerts title={"Try again!"} message={"Sorry you did not pass the Module."} points={"You need higher than a 60% to pass."} show={showPassedPopup} setShow={setShowPassedPopup} variant="error"/>
        );
      }  
    }
  }

  const getQuestionType = (type) => {
    if (type === 'mc') {
      return 'Multiple Choice'
    } else if (type === 'fill') {
      return 'Fill in the Blank'
    } else if (type === 'match') {
      return 'Matching'
    } else {
      return 'None'
    }
  }

  /**
   *  shows popup to tell user if they passed the module or neeed to retake it. 
   */
  function TimeBonus() {
    const title = "Yay, You Earned a Time Bonus!";
    const message = "Congratulations, you scored enough points in a timely manner to earn the time bonus on the " + moduleName.Title + " module!; "
    const points = "+" + timeBonus + " points!";
    if (timeBonusEarned) {
      return (
        <ResultAlerts title={title} message={message} points={points} show={showTimeBonusPopup} setShow={setShowTimeBonusPopup} variant="success"/>
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
        document.getElementById("submitBtn").className = "quizSubmitBttnRemoved";
      }
    }

    return (
      <>
        <MenuBar></MenuBar>
          <div id="quizPageContainer" className="quizBg img-fluid text-center justify-content-center">
           <div className="mt-5 mb-5 ms-3 me-4">
            <QuizProgressBar
              percentage={((index + 1) / (content.length) * 100) + 0.5}
              numQuestions={content.length}
            />
          </div>
          
              <div className="row">
                 <div className='col mt-5'>
                      <div className="container mt-5">
                    <div className="card px-3 py-3">
                        <h5>Quiz Questions</h5>
                      <div className="card-body">
                        <div className="list-group list-group text-start">
                          {content.map((question, index) => {
                            return (
                              <>
                              <p className="list-group-item list-group-item-action">
                                
                              <i class="bi bi-check2-circle" style={{color: data[index].color, marginRight: '5px'}}></i>

                              Question {index+1}. {getQuestionType(question.type)}
                            
                              </p>
                              
                            </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
              </div>
              <div className='col-lg-9'>
                <div className="questionPosOutOfTotal text-center" id="questionPosOutOfTotal"> {index + 1} / {content.length} </div>
                {DisplayOneQuestion()}
                <Tooltip title="Next Question" placement="bottom">
                <IconButton id='rightQuestionBttn' onClick={() => nextQuestion()}>
                  <ArrowCircleRightIcon fontSize="inherit" sx={{
                    width: '50px',
                    height: '50px',
                    color: '#001F42',
                  }}/>
                </IconButton>
                </Tooltip>
                <SubmitButton value="Submit" questionData={data} content={content.length} action={checkIfUserGetsExtraPoints}></SubmitButton>
                
                {disabledSubmitBttn()}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    clearInterval(intervalRef.current);
    var seconds = Math.round(secondsRef.current * 10) / 10;
    var newestIndex = 0;
    var userRadioAnswerIndex = -1;

    const QuestionContent = content.map((question) => {
      var newID = "q-group" + newestIndex

      if (question.type === 'mc') {
        for (var i = 0; i < currentAnswers[newestIndex].length; i++) {
          if (data[newestIndex]["answer"] === currentAnswers[newestIndex][i]) {
            userRadioAnswerIndex = i;
          }
        }
      }
      newestIndex++;



      if (data[newestIndex - 1]["correct"] === true) {
        points += 100
        numCorrect += 1

        return ([
          <Container id="resultsPageHolder" className="resultAnswers uvs-left uvs-right">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              type={question.type}
              answers={currentAnswers[newestIndex - 1]}
              userRadioAnswerIndex={userRadioAnswerIndex}
              userFillInAnswer={data[newestIndex - 1]["answer"]}
              isCorrect={true}
              action={adjustStateData}
              classes={quizClassNames[2]}
            />
          </Container>
        ]);
      } else if (question.type === 'match') {
        let numCorrectMatches = data[newestIndex - 1]["numberMatched"]
        points += Math.floor(100 * (numCorrectMatches / 4))

        return ([
          <Container id="resultsPageHolder" className="resultAnswers uvs-left uvs-right">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              type={question.type}
              answers={currentAnswers[newestIndex - 1]}
              userRadioAnswerIndex={userRadioAnswerIndex}
              userFillInAnswer={data[newestIndex - 1]["answer"]}
              isCorrect={false}
              numberCorrectMatches={numCorrectMatches}
              action={adjustStateData}
              classes={quizClassNames[1]}
            />
          </Container>
        ]);
      } else {
        return ([
          <Container id="resultsPageHolder" className="resultAnswers uvs-left uvs-right">
            <Results
              id={newID}
              i={newestIndex - 1}
              question={question.question}
              type={question.type}
              answers={currentAnswers[newestIndex - 1]}
              userRadioAnswerIndex={userRadioAnswerIndex}
              userFillInAnswer={data[newestIndex - 1]["answer"]}
              isCorrect={false}
              action={adjustStateData}
              classes={quizClassNames[1]}
            />
          </Container>
        ]);
      }
    });

    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}>
        <MenuBar></MenuBar>
        <Grid container spacing={3}>
          <Grid item xs={4}>
              <Grid container spacing={3} sx={{
                height: '100%',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                margin: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  
                }}>
            <Typography variant="h4" sx={{ margin: '15px'}}> Quiz Results </Typography>
            </div>
              {Passed()}
              {UserGotEarlyCompletion()}
              {UserGotSpacedLearning()}
              {UserDidNotCompleteModuleOnTime()}
              {TimeBonus()}
              <Grid container spacing={3}>

              <Grid item xs={6}>
              <Alert variant="outlined" severity="info" iconMapping={{info: <HelpOutlineOutlinedIcon /> } }>
                  {numCorrect} / {content.length} Questions Correct
                  </Alert>
                
              </Grid>
              <Grid item xs={6}>
              
                <Alert variant="outlined" severity="info" iconMapping={{info: <TimerOutlinedIcon /> } }>
                Time: {seconds} seconds
                  </Alert>
              </Grid>
              <Grid item xs={6}>
              <Alert variant="outlined" severity="info" iconMapping={{info: <BugReportOutlinedIcon /> } }>
                         Points: {points + earlyCompletion + notCompleteOnTime + spaceLearning + timeBonus}
                  </Alert>
              </Grid>
              <Grid item xs={6}>
              <Alert variant="outlined" severity="info" iconMapping={{info: <TimelineOutlinedIcon /> } }>
                                {(numCorrect / content.length * 100).toFixed(2)}%
                  </Alert>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" href="/dash/" size='medium' fullWidth sx={{}}>Home</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" href="/leaderboard" size='medium' fullWidth color='secondary'>Leaderboard</Button>
              </Grid>
              

            </Grid>

            </Grid>
          



          </Grid>
          <Grid item xs={8}>
           

          
          <div style={{maxHeight: screenHeight - 150, overflow: 'auto', width: '100%'}}>
    
     
          {QuestionContent}

         
        </div>
          </Grid>
        </Grid>
        
    
       
      </div>
    );
  }
}

const LeftQuizBar = (data, answer) => {

  useEffect(() => {
    console.log(answer)
  }, [])

  const getQuestionType = (type) => {
    if (type === 'mc') {
      return 'Multiple Choice'
    } else if (type === 'fill') {
      return 'Fill in the Blank'
    } else if (type === 'match') {
      return 'Matching'
    } else {
      return 'None'
    }
  }

  return (
    <div className="container mt-5">
      <div className="card px-3 py-3">
          <h5>Quiz Questions</h5>
        <div className="card-body">
          <div className="list-group list-group text-start">
             {data.data.map((question, index) => {
              return (
                <>
                <p className="list-group-item list-group-item-action">
                <i class="bi bi-check2-circle"></i>
                  
                  Question {index+1}. {getQuestionType(question.type)}
               
                </p>
                
              </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
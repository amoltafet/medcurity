import { Button, Image, Row, Col, Container, Alert } from 'react-bootstrap';
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
      // Quiz Answers 

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
      if (percent <= 0.79) {
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

      if ((percent * 100) >= 90) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/moduleBadgeEarned`, {
          userid: currentUser.userid,
          modulenum: slug
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
      } else {
        newData["correct"] = false
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
    let cutoff = 0.0;
    content.forEach((question) => {
      if (question.type === 'mc') {
        cutoff += 5
      } else if (question.type === 'match') {
        cutoff += 10
      } else {
        cutoff += 5
      }
    });

    if (seconds < cutoff) {
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
            You did not complete this module by its due date. {notCompleteOnTime} points.
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
              Sorry you did not pass the Module. You need higher than a 60% to pass.
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

  /**
   *  shows popup to tell user if they passed the module or neeed to retake it. 
   */
  function TimeBonus() {
    if (timeBonusEarned) {
      return (
        <Alert variant="success" show={showTimeBonusPopup}>
          <Alert.Heading>Yay, You Earned a Time Bonus!</Alert.Heading>
          <p>
            Congratulations, you scored enough points in a timely manner to earn the time bonus on the {moduleName.Title} module! {timeBonus} points!
          </p>
          <div className="d-flex justify-content-end">
          <Button onClick={() => setShowTimeBonusPopup(false)} variant="outline-success">
            X
          </Button>
          </div>
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
        document.getElementById("submitBtn").className = "quizSubmitBttnRemoved";
      }
    }

    return (
      <>
        <MenuBar></MenuBar>
          <div id="quizPageContainer" className="quizBg img-fluid text-center justify-content-center">
           <div className="mt-4 mb-5 ms-3 me-4">
            <QuizProgressBar
              percentage={((index + 1) / (content.length) * 100) + 0.5}
              numQuestions={content.length}
            />
          </div>
              <div className="row">
              <div className='col mt-5'>
                <LeftQuizBar data={content} />
              </div>
              <div className='col-lg-9'>
                <div className="questionPosOutOfTotal text-center" id="questionPosOutOfTotal"> {index + 1} / {content.length} </div>
                {DisplayOneQuestion()}
                <Button
                  id="rightQuestionBttn"
                  type="submit"
                  className=" toggleQuestionRight text-center"
                  onClick={() => nextQuestion()}>
                  <Image className="rightArrow" src="/right.png"></Image>
                </Button>
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
      <>
        <MenuBar></MenuBar>
        <div id="resultsPageContainer">
         
          <h1 className="quizResultsHeader">Quiz Results</h1>
          {Passed()}
          {UserGotEarlyCompletion()}
          {UserGotSpacedLearning()}
          {UserDidNotCompleteModuleOnTime()}
          {TimeBonus()}
          <Row className="text-center quizPointInfo">
            <Col>
              <div className="totalCorrectQuestions"> {numCorrect} / {content.length} Questions Correct </div>
            </Col>
            <Col>
              <div className="totalCorrectQuestions"> Time: {seconds} seconds </div>
            </Col>
            <Col>
              <div className="totalCorrectPoints"> Points: {points + earlyCompletion + notCompleteOnTime + spaceLearning + timeBonus} </div>
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

const LeftQuizBar = (data) => {

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
                <p className="list-group-item list-group-item-action"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill me-5" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                  </svg>Question {index+1}. {getQuestionType(question.type)}
               
                
              
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
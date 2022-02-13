import { Button, Container, Image, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from '../MenuBar/MenuBar';
import Questions from './Questions'
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";
import axios from 'axios';
import { fetchQuiz, selectQuestion, selectQuiz, decrementQuestion, incrementQuestion } from './QuizReducers/QuizSlice';
/**
 * 
 * @param {str} category Question category to get questions from
 * @param {int} index Index of question in the returned query
 * @param {func} changeState Function to pass into question object to monitor its state
 */
// function GetQuestionByIndex(slug, index, changeState)
// {
//   // The route for axios.get() to use to query the db
//   const url = 'http://localhost:3002/api/getCategoryQuestions'

//   // I am unsure why useState() and useEffect() makes this work,
//   // but plenty of online examples I viewed used this pattern.
//   const [question, getQuestions] = useState([]);

//   useEffect(() => {
//     getQuestionsIncategory();
//   }, [])

//   // Create a GET HTTP request that uses the getCategoryQuestions route to 
//   // query the db for questions in the specified category.
//   // Then choose a question from the query result using the index param.
//   useEffect(() => {
//     axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
//           setContent(Object.values(response.data))
//       });
//   }, [])

//   // Return the question component with question info from the query
//   // into the components props.
//   return (
//     <Questions
//     i = {index} 
//     question={question.question}
//     answers={[question.solution, question.a2, question.a3, question.a4]}
//     action={changeState} 
//     />
//   )
// }



const QuizPage = () => {
  let { slug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [slug]);

  const dispatch = useDispatch()
  const quiz = useSelector(selectQuiz)
  const question = useSelector(selectQuestion)

  const quizStatus = useSelector((state) => state.quiz.status)
  const error = useSelector((state) => state.quiz.error)

  useEffect(() => {
    if (quizStatus === 'idle') {
      dispatch(fetchQuiz(slug))
    }
  }, [quizStatus, dispatch])








  // console.log('displaying quiz page');
  // const [content, setContent] = useState([])
  // const [numQuestions, setNumQuestions] = useState("")
  // var dispatch = useDispatch();
  //  // data array that holds question information using state
  // const [data,setData]=useState([
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  //   { answer:"", correct: false},
  // ]);

  // useEffect(() => {
  //   axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
  //         setContent(Object.values(response.data))
  //     });
  // }, [])

  // useEffect(() => {
  //   axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT COUNT(*) AS NumberOfQuestions FROM Questions WHERE module = " + slug  } }).then((response) => {
  //         setNumQuestions(Object.values(response.data[0]))
  //     });
  // }, [])

  // const { quiz } = useSelector(selectQuiz);
  // const quizStatus = useSelector(state => state.quiz.status);

  // useEffect(() => {
  //   if (quizStatus === 'idle') {
  //     dispatch(getDatabase(slug));
  //   }
  // }, [quizStatus, dispatch])

  // var index = 0;

  // console.log("yuh yuh", quiz)



  function QuestionContent() {
    let content;

    if (quizStatus === 'succeeded') {
      content = quiz;
      console.log("yessir", question.answers);

      document.getElementById("leftQuestionBttn").disabled = true;
      document.getElementById("questionPosOutOfTotal").textContent = `${question.number + 1} / ${content.length}`
  
      return ([
        <Questions
          i={question.number}
          question={question.description}
          answers={[question.answers.solution, question.answers.a1, question.answers.a2, question.answers.a3]} 
        />
      ])
    } 
    else if (quizStatus === 'failed') {
      console.log("eeeee", error);
    }


    var index = 0;
    //console.log("e", quiz[index].question)
    // dispatch(setQuestion(index, quiz[index].description, quiz[index].solution, quiz[index].a1, quiz[index].a2, quiz[index].a3))

  }



  // const QuestionContent = content.map((question) => {

  //   index++;
  //   console.log("yuh yuh", quiz)
  //   //const newData = data.concat({answer: "", correct: false});

  //   //setData(newData);
  //   return ([
  //     <Questions
  //         i = {index - 1} 
  //         question={question.question}
  //         answers={[question.solution, question.a2, question.a3, question.a4]}
  //         action={adjustStateData} 
  //       />
  //   ]);
  // })


  // /** 
  //  * 
  //  * @param {int} index Index of question that is clicked on by user
  //  * @param {str} answer String value of answer that was clicked on 
  //  * Function is used as an onChange function for the question toggle buttons to change state data
  // */
  function NextQuestion (direction) {
    if (direction === "left") {
      dispatch(decrementQuestion());
    }
    else if (direction === "right") {
      dispatch(incrementQuestion());
    }

  }


  return (
    <>
      <MenuBar></MenuBar>
      <div id="quizPageContainer " className="img-fluid quizBg">
        {QuestionContent()}
        <Row>
          <Button
            id="leftQuestionBttn"
            type="submit"
            className="toggleQuestionLeft"
            onClick="">
            <Image className="leftArrow" src="/left.png"></Image>
          </Button>
          <div className="questionPosOutOfTotal text-center " id="questionPosOutOfTotal"> 1/0 </div>
          <Button
            id="rightQuestionBttn"
            type="submit"
            className="toggleQuestionRight"
            onClick="">
            <Image className="rightArrow" src="/right.png"></Image>
          </Button>
        </Row>
        {console.log("finished rendering")}
        {/* <SubmitButton value="Submit" questionData={data}></SubmitButton> */}
      </div>
    </>
  );
}
export default QuizPage;
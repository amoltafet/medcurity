import {Button, Card, Image, Row} from 'react-bootstrap'
import React,{useState,useEffect} from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar/MenuBar'
import Questions from './Questions'
import { SubmitButton }  from './SubmitButton';
import { useParams } from "react-router";
import axios from 'axios';


const QuizPage = () => {
  const [content, setContent] = useState([])
  const [numQuestions, setNumQuestions] = useState("")
  var currentPosition;
  var hiddenQuestions;
  var index;
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
    axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT COUNT(*) AS NumberOfQuestions FROM Questions WHERE module = " + slug  } }).then((response) => {
          setNumQuestions(Object.values(response.data[0]))
      });
  }, [])


  var index = 0;

  const QuestionContent = content.map((question) => {
    index++;
    //const newData = data.concat({answer: "", correct: false});
    //setData(newData);
    var questionId = ` questionId${index-1}`
    return (
      <Questions
          i={index - 1}
          id={questionId}
          question={question.question}
          answers={[question.solution, question.a2, question.a3, question.a4]}
          action={adjustStateData} 
        />
    );
  })


  /** 
   * 
   * @param {int} index Index of question that is clicked on by user
   * @param {str} answer String value of answer that was clicked on 
   * Function is used as an onChange function for the question toggle buttons to change state data
  */
  function adjustStateData (index, answer) {
    console.log(numQuestions[0].NumberOfQuestions);
    let newData=data[index];
    newData["answer"]=answer;
    data[index]=newData;
    setData([...data]);
    console.log("" + answer);
  }



return (
  <> 
    <MenuBar></MenuBar>
    <div id="quizPageContainer" className="">
     {QuestionContent}
     {/* <Row>
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
      </Row> */}
      <SubmitButton value="Submit" questionData={data}></SubmitButton>
    </div>
  </>
);
}
export default QuizPage;
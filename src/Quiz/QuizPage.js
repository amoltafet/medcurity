import {Button, Card, Image, Row} from 'react-bootstrap'
import React,{useState,useEffect} from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar'
import Questions from './Questions'
import { SubmitButton }  from './SubmitButton';
import { useParams } from "react-router";
import axios from 'axios';


const QuizPage = () => {
  console.log('displaying quiz page')

    const [content, setContent] = useState([])
    const [numQuestions, setNumQuestions] = useState("")
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
      return ([
        <h3 className="questionNumbers text-center">
          Question {index}
        </h3>,
        <Questions
            i = {index - 1} 
            question={question.question}
            answers={[question.solution, question.a2, question.a3, question.a4]}
            action={adjustStateData} 
          />
      ]);
    })


    /** 
     * 
     * @param {int} index Index of question that is clicked on by user
     * @param {str} answer String value of answer that was clicked on 
     * Function is used as an onChange function for the question toggle buttons to change state data
    */
    function adjustStateData(index, answer) {
      console.log(numQuestions[0].NumberOfQuestions);
      let newData=data[index];
      newData["answer"]=answer;
      data[index]=newData;
      setData([...data]);
      console.log("" + answer);
    }

    var currentPosition;
    function DisplayOneQuestion (position) {
      currentPosition = position;
      var quizInfo = content[position];
      console.log("quizInfo: ", quizInfo);

      // checks if content is not null
      if (quizInfo !== undefined && content !== undefined) {
        var id = position;
      
        // returns one quiz question based on index
        return (
          [<h3 id="qNumber" className="questionNumbers text-center"> Question {position + 1} </h3>,
          <Questions 
          id={id}
          i = {position} 
          question={quizInfo.question}
          answers={[quizInfo.solution, quizInfo.a2, quizInfo.a3, quizInfo.a4]}
          action={adjustStateData} 
          />]
        );
      }
    }

    function MoveQuestion (direction, position) {
      var quizInfo = content[position];
      if (content !== undefined && quizInfo !== undefined) {
        console.log("position", position)
        if (position === 0) {
          document.getElementById("leftQuestionBttn").disabled = true;
          document.getElementById("rightQuestionBttn").disabled = false;
        }
        else if (position === (content.length - 1)) {
          document.getElementById("rightQuestionBttn").disabled = true;
          document.getElementById("leftQuestionBttn").disabled = false;
        }
        else { 
          console.log("yuh", document.getElementById("leftQuestionBttn"))
          document.getElementById('rightQuestionBttn').disabled = false;
          document.getElementById('leftQuestionBttn').disabled = false;
        }
          // selects which question
        if (direction === "right") {
          console.log("radio: ", document.getElementById("radio-0"));
          // document.getElementById("radio-0").textContent = quizInfo.solution;
          // console.log("radio1: ", document.getElementById("radio-1"));
          // document.getElementById("radio-1").textContent = quizInfo.a2;
          // console.log("radio2: ", document.getElementById("radio-2"));
          // document.getElementById("radio-2").textContent = quizInfo.a3;

          // console.log("radio3: ", document.getElementById("radio-3"));
          // document.getElementById("radio-3").textContent = quizInfo.a4;

          var previousQuestion = document.getElementById(0);
          previousQuestion.textContent = quizInfo.question;
          previousQuestion.style.color = "#d8dae3";

          var indexPos = currentPosition + 1;
         
          document.getElementById("qNumber").textContent = `Question ${indexPos}`;
          document.getElementById("qNumber").style.color = "white";

         
         
        } 
        else if (direction === "left") {
          console.log("left", currentPosition)
          console.log("radio: ", document.getElementById("radio-0").textContent);
          // document.getElementById("radio-0").textContent = quizInfo.solution;
          // document.getElementById("radio-1").textContent = quizInfo.a2;
          // document.getElementById("radio-2").textContent = quizInfo.a3;
          // document.getElementById("radio-3").textContent = quizInfo.a4;

          var previousQuestion = document.getElementById(0);
          
          
          previousQuestion.textContent = quizInfo.question;
          previousQuestion.style.color = "#d8dae3";
         
          var indexPos = currentPosition + 1;
          document.getElementById("qNumber").textContent = `Question ${indexPos}`;
          document.getElementById("qNumber").style.color = "white";

          
        }   
      }
    }

    function ChangeTextOnQuestion() {

    }
  return (
    <> 
      <MenuBar></MenuBar>
      <Card id="quizPageContainer" className="quizPageContainer uvs-left uvs-right">
        {DisplayOneQuestion(0)}
        <Row>
          <Button 
            id="leftQuestionBttn"
            type="submit" 
            className="toggleQuestionLeft"
            onClick={() => MoveQuestion("left", currentPosition = currentPosition - 1)}> 
              <Image className="leftArrow" src="/left.png"></Image> 
          </Button> 
          <Button 
            id="rightQuestionBttn"
            type="submit" 
            className="toggleQuestionRight"
            onClick={() => MoveQuestion("right", currentPosition = currentPosition + 1)}> 
              <Image className="rightArrow" src="/right.png"></Image> 
          </Button>
          <SubmitButton value="Submit" questionData={data}></SubmitButton>
        </Row>
      </Card>
    </>
  );
}
export default QuizPage;
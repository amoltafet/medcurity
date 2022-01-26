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

    

    function DisplayOneQuestionAtATime (id) {
      var quizInfo = content[id];
      console.log("quizInfo: ", quizInfo);

      if (quizInfo !== undefined && content !== undefined) {
        var quizId = `${quizInfo.module}-${id}`;
      
        return (
          [<h3 className="questionNumbers text-center"> Question {id + 1} </h3>,
          <Questions 
          id={quizId}
          i = {id} 
          question={quizInfo.question}
          answers={[quizInfo.solution, quizInfo.a2, quizInfo.a3, quizInfo.a4]}
          action={adjustStateData} 
          />]
        );
      }
    }

    function MoveQuestion (direction, position) {
      if (direction === "right") {
        document.getElementById(position).removeChild();
      } 
      else if (direction === "left") {

      }   
    }


  return (
    <>  
      <MenuBar></MenuBar>
      <Card className="quizPageContainer uvs-left uvs-right">
        {DisplayOneQuestionAtATime(0)}
        <Row>
          <Button 
            type="submit" 
            className="toggleQuestionLeft disabled" 
            onClick={() => MoveQuestion("left", 0)}> 
              <Image className="leftArrow" src="/left.png"></Image> 
          </Button> 
          <Button 
            type="submit" 
            className="toggleQuestionRight" 
            onClick={() =>  MoveQuestion("right", 0)}> 
              <Image className="rightArrow" src="/right.png"></Image> 
          </Button>
          <SubmitButton value="Submit" questionData={data}></SubmitButton>
        </Row>
      </Card>
    </>
  );
}
export default QuizPage;
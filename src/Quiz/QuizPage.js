import {Container} from 'react-bootstrap'
import React,{useState,useEffect} from 'react';
import './QuizPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuBar from '../MenuBar'
import Questions from './Questions'
import axios from 'axios';
import { SubmitButton } from './SubmitButton';
import { useParams } from "react-router";

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
    console.log('displaying quiz page');
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
        <h3 className="question-title">
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

    return (
        <>
        <MenuBar></MenuBar>
        <Container className="quizPageContainer">
          <h1>
             Quiz
          </h1>
            <>
             {QuestionContent}
            </>
            <SubmitButton value="Submit" questionData={data}></SubmitButton>
        </Container>
        </>
    );
}
export default QuizPage;

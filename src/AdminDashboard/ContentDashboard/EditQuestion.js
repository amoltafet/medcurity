import {Button} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./EditContent.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import env from "react-dotenv";


/**
* Creates and displays the learning page for each test category. 
* @return { EditQuestion }
*/
const  EditQuestion = () => {

    let { slug } = useParams();
    const [content, setContent] = useState([])
    const [matchingContent, setMatchingContent] = useState([])
    const [questionID, setQuestionID] = useState([])
    const [question, setQuestion] = useState([])
    const [solution, setSolution] = useState([])
    const [answer2, setAnswer2] = useState([])
    const [answer3, setAnswer3] = useState([])
    const [answer4, setAnswer4] = useState([])
    const [matchingAnswer1, setMatchingAnswer1] = useState([])
    const [matchingAnswer2, setMatchingAnswer2] = useState([])
    const [matchingAnswer3, setMatchingAnswer3] = useState([])
    const [matchingAnswer4, setMatchingAnswer4] = useState([])
    const [questionType, setQuestionType] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [questionAdded, setAdded] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch post using the postSlug
    }, [slug]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getMatchingAnswers`, { params: { id: slug } }).then((response) => {
            setMatchingContent(Object.values(response.data));
        }).catch(error => console.error(`Error ${error}`));

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getModuleQuestions`, { params: { id: slug } }).then((response) => {
            setContent(Object.values(response.data));
            setIsLoading(false)
        // console.log(content)
        }).catch(error => console.error(`Error ${error}`));

      }, [slug])

    useEffect(() => {
        if (!isLoading) {
            var questionIDArray = []
            var questionArray = []
            var solutionArray = []
            var answer2Array = []
            var answer3Array = []
            var answer4Array = []
            var matchingAnswer1Array = []
            var matchingAnswer2Array = []
            var matchingAnswer3Array = []
            var matchingAnswer4Array = []
            var questionTypeArray = []
            for (let index in content) {
                let current = content[index]
                questionIDArray.push(current.questionid);
                questionArray.push(current.question);
                solutionArray.push(current.solution);
                answer2Array.push(current.a2);
                answer3Array.push(current.a3);
                answer4Array.push(current.a4);
                questionTypeArray.push(current.type);
                if (current.type === 'match') {
                    var maObject = matchingContent.find((o) => o.matchingquestionid === current.questionid);
                    matchingAnswer1Array.push(maObject.m1);
                    matchingAnswer2Array.push(maObject.m2);
                    matchingAnswer3Array.push(maObject.m3);
                    matchingAnswer4Array.push(maObject.m4);
                } else {
                    matchingAnswer1Array.push(null);
                    matchingAnswer2Array.push(null);
                    matchingAnswer3Array.push(null);
                    matchingAnswer4Array.push(null);
                }
            }
            setQuestionID(questionIDArray)
            setQuestion(questionArray)
            setSolution(solutionArray)
            setAnswer2(answer2Array)
            setAnswer3(answer3Array)
            setAnswer4(answer4Array)
            setMatchingAnswer1(matchingAnswer1Array)
            setMatchingAnswer2(matchingAnswer2Array)
            setMatchingAnswer3(matchingAnswer3Array)
            setMatchingAnswer4(matchingAnswer4Array)
            setQuestionType(questionTypeArray)
            setIsLoading2(false)   
        }
    }, [isLoading, content])

    useEffect(() => {
        if (questionAdded && !isLoading2) {
            // console.log("Adding question", questionAdded) 
            var questionArray = question
            var solutionArray = solution
            var answer2Array = answer2
            var answer3Array = answer3
            var answer4Array = answer4

            questionArray.push("")
            solutionArray.push("")
            answer2Array.push("")
            answer3Array.push("")
            answer4Array.push("")

            setQuestion(questionArray)
            setSolution(solutionArray)    
            setAnswer2(answer2Array)  
            setAnswer3(answer3Array)
            setAnswer4(answer4Array) 
        }
    }, [questionAdded, question, solution, answer2, answer3, answer4, isLoading2])

    useEffect(() => {
        if(questionAdded) {
            setAdded(false)
            // // console.log("changing boolean", questionAdded) 
        }
        else {
            // // console.log("Hello from added", questionAdded)
        }
    }, [questionAdded])



    

    function submitData() {
        for(var i = 0; i < content.length; i++) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `UPDATE Questions SET question = '${question[i]}', solution = '${solution[i]}', 
            a2 = '${answer2[i]}', a3 = '${answer3[i]}', a4 = '${answer4[i]}' WHERE questionid = '${questionID[i]}'` } }).then((response) => {
            // console.log(response)
            }).catch(error => console.error(`Error ${error}`));

            if (questionType[i] === 'match') {
                axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `UPDATE MatchingAnswers SET m1 = '${matchingAnswer1[i]}', 
                m2 = '${matchingAnswer2[i]}', m3 = '${matchingAnswer3[i]}', m4 = '${matchingAnswer4[i]}' WHERE matchingquestionid = '${questionID[i]}'` } }).then((response) => {
                // console.log(response)
                }).catch(error => console.error(`Error ${error}`));
            }
        }

        for(i = content.length; i < question.length; i++) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `INSERT INTO Questions (question, solution, a2, a3, a4, module) VALUES ('${question[i]}', '${solution[i]}', '${answer2[i]}', '${answer3[i]}', '${answer4[i]}', '${slug}')` } }).then((response) => {
            // // console.log(response)
            }).catch(error => console.error(`Error ${error}`));
        }

        // // console.log("Question Array:", question)
        // // console.log("Solution Array:", solution)
        // // console.log("Answer2 Array:", answer2)
        // // console.log("Answer3 Array:", answer3)
        // // console.log("answer4 Array:", answer4)

        navigate('/admin-content');
    }

    function addQuestion() {
        setAdded(true)
    }

    var ModuleContent = question.map((q, idx) => {
        // console.log("reloading")
        if (questionType[idx] === 'mc') {
            return (
                <>
                <form className='text-center contentForm'>
                    <h3>Question {idx + 1} &#40;Multiple Choice&#41;</h3>
                    <label htmlFor="question">Question:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="question" name="question" defaultValue={question[idx]} onChange={ (e) => 
                                {
                                    let x = question;
                                    x[idx] = e.target.value
                                    setQuestion(x)
                                }}></textarea><br></br>
                    <label htmlFor="solution">Solution:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="solution" name="solution" defaultValue={solution[idx]} onChange={ (e) => 
                                {
                                    let x = solution;
                                    x[idx] = e.target.value
                                    setSolution(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer2">Answer 2:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer2" name="answer2" defaultValue={answer2[idx]} onChange={ (e) => 
                                {
                                    let x = answer2;
                                    x[idx] = e.target.value
                                    setAnswer2(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer3">Answer 3:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer3" name="answer3" defaultValue={answer3[idx]} onChange={ (e) => 
                                {
                                    let x = answer3;
                                    x[idx] = e.target.value
                                    setAnswer3(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer4">Answer 4:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer4S" name="answer4" defaultValue={answer4[idx]} onChange={ (e) => 
                                {
                                    let x = answer4;
                                    x[idx] = e.target.value
                                    setAnswer4(x)
                                }}></textarea><br></br>
                </form>
                </>
            );
        } else if (questionType[idx] === 'fill') {
            return (
                <>
                <form className='text-center contentForm'>
                    <h3>Question {idx + 1} &#40;Fill in the Blank&#41;</h3>
                    <label htmlFor="question">Question:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="question" name="question" defaultValue={question[idx]} onChange={ (e) => 
                                {
                                    let x = question;
                                    x[idx] = e.target.value
                                    setQuestion(x)
                                }}></textarea><br></br>
                    <label htmlFor="solution">Solution:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="solution" name="solution" defaultValue={solution[idx]} onChange={ (e) => 
                                {
                                    let x = solution;
                                    x[idx] = e.target.value.toLowerCase()
                                    setSolution(x)
                                }}></textarea><br></br>
                </form>
                </>
            );
        } else if (questionType[idx] === 'match') {
            return (
                <>
                <form className='text-center contentForm'>
                    <h3>Question {idx + 1} &#40;Matching&#41;</h3>
                    <label htmlFor="question">Question:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="question" name="question" defaultValue={question[idx]} onChange={ (e) => 
                                {
                                    let x = question;
                                    x[idx] = e.target.value
                                    setQuestion(x)
                                }}></textarea><br></br>
                    <label htmlFor="solution">Value 1:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="solution" name="solution" defaultValue={solution[idx]} onChange={ (e) => 
                                {
                                    let x = solution;
                                    x[idx] = e.target.value
                                    setSolution(x)
                                }}></textarea><br></br>
                    <label htmlFor="matchingAnswer1">Match to Value 1:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="matchingAnswer1" name="matchingAnswer1" defaultValue={matchingAnswer1[idx]} onChange={ (e) => 
                                {
                                    let x = matchingAnswer1;
                                    x[idx] = e.target.value
                                    setMatchingAnswer1(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer2">Value 2:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer2" name="answer2" defaultValue={answer2[idx]} onChange={ (e) => 
                                {
                                    let x = answer2;
                                    x[idx] = e.target.value
                                    setAnswer2(x)
                                }}></textarea><br></br>
                    <label htmlFor="matchingAnswer2">Match to Value 2:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="matchingAnswer2" name="matchingAnswer2" defaultValue={matchingAnswer2[idx]} onChange={ (e) => 
                                {
                                    let x = matchingAnswer2;
                                    x[idx] = e.target.value
                                    setMatchingAnswer2(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer3">Value 3:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer3" name="answer3" defaultValue={answer3[idx]} onChange={ (e) => 
                                {
                                    let x = answer3;
                                    x[idx] = e.target.value
                                    setAnswer3(x)
                                }}></textarea><br></br>
                    <label htmlFor="matchingAnswer3">Match to Value 3:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="matchingAnswer3" name="matchingAnswer3" defaultValue={matchingAnswer3[idx]} onChange={ (e) => 
                                {
                                    let x = matchingAnswer3;
                                    x[idx] = e.target.value
                                    setMatchingAnswer3(x)
                                }}></textarea><br></br>
                    <label htmlFor="answer4">Value 4:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="answer4S" name="answer4" defaultValue={answer4[idx]} onChange={ (e) => 
                                {
                                    let x = answer4;
                                    x[idx] = e.target.value
                                    setAnswer4(x)
                                }}></textarea><br></br>
                    <label htmlFor="matchingAnswer4">Match to Value 4:</label><br></br>
                    <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="matchingAnswer4" name="matchingAnswer4" defaultValue={matchingAnswer4[idx]} onChange={ (e) => 
                                {
                                    let x = matchingAnswer4;
                                    x[idx] = e.target.value
                                    setMatchingAnswer4(x)
                                }}></textarea><br></br>
                </form>
                </>
            );
        }
        return (
            <>
                <p>An error has occurred...</p>
            </>
        );
    })

    return (
        <>
        <h1 className="text-center moduleName">
            Edit Module Questions
        </h1>
        <div className="EditQuestionBg img-fluid ">
        {ModuleContent}
        <div className="d-grid gap-2 ">
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" onClick={addQuestion} >
                Add Question
            </Button>
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" onClick={submitData} >
                Submit
            </Button>
          </div>
        </div>
        </>
    );
}

export default EditQuestion;
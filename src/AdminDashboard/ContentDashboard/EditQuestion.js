import { Form , Card, Button, Container, Col} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./EditContent.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Questions from '../../Quiz/Questions';

/**
* Creates and displays the learning page for each test category. 
* @return { EditQuestion }
*/
const  EditQuestion = () => {
    let { slug } = useParams();
    const [content, setContent] = useState([])
    const [question, setQuestion] = useState([])
    const [solution, setSolution] = useState([])
    const [answer2, setAnswer2] = useState([])
    const [answer3, setAnswer3] = useState([])
    const [answer4, setAnswer4] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [questionAdded, setAdded] = useState(false)
    const navigate = useNavigate();

    

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
          setContent(Object.values(response.data));
          setIsLoading(false)
          console.log(content)
        }).catch(error => console.error(`Error ${error}`));
    
      }, [slug])

    useEffect(() => {
        if(!isLoading) {
            var questionArray = []
            var solutionArray = []
            var answer2Array = []
            var answer3Array = []
            var answer4Array = []
            for(let index in content) {
                let module =  content[index]
                questionArray.push(module.question);
                solutionArray.push(module.solution);
                answer2Array.push(module.a2);
                answer3Array.push(module.a3);
                answer4Array.push(module.a4);
            } 
            setQuestion(questionArray)
            setSolution(solutionArray)    
            setAnswer2(answer2Array)  
            setAnswer3(answer3Array)
            setAnswer4(answer4Array)
            setIsLoading2(false)   
        }
    }, [isLoading, content])

    useEffect(() => {
        if(questionAdded && !isLoading2) {
            console.log("Adding question", questionAdded) 
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
            console.log("changing boolean", questionAdded) 
        }
        else {
            console.log("Hello from added", questionAdded)
        }
    }, [questionAdded])



    

    function submitData() {
        for(var i = 0; i < content.length; i++) {
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `UPDATE  Questions SET question = '${question[i]}', solution = '${solution[i]}', 
            a2 = '${answer2[i]}', a3 = '${answer3[i]}', a4 = '${answer4[i]}' WHERE questionid = '${content[i].questionid}'` } }).then((response) => {
            console.log(response)
            }).catch(error => console.error(`Error ${error}`));
        }

        for(var i = content.length; i < question.length; i++) {
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `INSERT INTO Questions (question, solution, a2, a3, a4, module) VALUES ('${question[i]}', '${solution[i]}', '${answer2[i]}', '${answer3[i]}', '${answer4[i]}', '${slug}')` } }).then((response) => {
            console.log(response)
            }).catch(error => console.error(`Error ${error}`));
        }

        console.log("Question Array:", question)
        console.log("Solution Array:", solution)
        console.log("Answer2 Array:", answer2)
        console.log("Answer3 Array:", answer3)
        console.log("answer4 Array:", answer4)

        navigate('/admin-content');
    }

    function addQuestion() {
        setAdded(true)
    }

    var ModuleContent = question.map((module, idx) => {
        console.log("reloading")
        return ([
          <>
            <form className='text-center contentForm'>
                <h3>Question {idx + 1}</h3>
                <label htmlFor="question">Question:</label><br></br>
                <textarea className="content-textarea" rows="3" cols="100" wrap="soft" type="text" id="question" name="question" defaultValue={module} onChange={ (e) => 
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
        ]);
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
export default  EditQuestion;

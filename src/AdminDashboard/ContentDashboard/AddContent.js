import { Form , Card, Button, Container, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./EditContent.css"
import env from "react-dotenv";

/*import multer from 'multer';
const bannerStorage = multer.diskStorage({ destination: function (req, file, cb) { cb(null, path.join(__dirname, serverConfig.BANNER_UPLOAD_PATH)) } })
const bannerUploader = multer({ storage: bannerStorage })*/

/**
* Creates and displays the learning page for each test category. 
* @return { AddContent }
*/
const  AddContent = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [banner, setBanner] = useState([])
    const [bannerName, setBannerName] = useState("")
    const [learningModules, setLearningModules] = useState([])

    const [question, setQuestion] = useState([])
    const [solution, setSolution] = useState([])
    const [answer2, setAnswer2] = useState([])
    const [answer3, setAnswer3] = useState([])
    const [answer4, setAnswer4] = useState([])
    const [questionAdded, setAdded] = useState(false)
    
    const [moduleIndex, setIndex] = useState(-1)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `SELECT * FROM LearningModules` } }).then((response) => {
            setLearningModules(response.data)
            console.log("Modules:", response.data)
            }).catch(error => console.error(`Error ${error}`));
          
        },[])

    useEffect(() => {
        if(questionAdded) {
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
    }, [questionAdded, question, solution, answer2, answer3, answer4])

    useEffect(() => {
        if(questionAdded) {
            setAdded(false)
            // console.log("changing boolean", questionAdded) 
        }
        else {
            // console.log("Hello from added", questionAdded)
        }
    }, [questionAdded])

    function submitData() {
        // axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query: `INSERT INTO LearningModules (Title, Subtitle, Description, Banner) VALUES ('${title}', '${subtitle}', '${description}', '${banner[0].name}')` } }).then((response) => {
        // console.log(response)
        // }).catch(error => console.error(`Error ${error}`));
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/addModule`, {
            title: title, 
            subtitle: subtitle,
            description: description,
            banner: banner[0].name
          }).then((response) => {
            // console.log("response from new query", response.data["result"][0]["ID"]);
            setIndex(response.data["result"][0]["ID"])
          }).catch(error => console.log(`Error ${error}`));

        //TODO ... THEN call API method to store the image from (banner)
        var data = new FormData();
        data.append("bannerImage", banner[0]);
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/postModuleBanner`, data, { headers: { 'Content-Type': 'multipart/form-data' } })

        for (var i = 0; i < question.length; i++) {
            axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `INSERT INTO Questions (question, solution, a2, a3, a4, module) VALUES ('${question[i]}', '${solution[i]}', '${answer2[i]}', '${answer3[i]}', '${answer4[i]}', '${moduleIndex}')` } }).then((response) => {
            // console.log(response)
            }).catch(error => console.error(`Error ${error}`));
        }

        console.log("Title:", title)
        console.log("Subtitle:", subtitle)
        console.log("Description:", description)

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
        // console.log("reloading")
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
         <div className="EditContentBg img-fluid ">
         <h1 className="text-center moduleName">
              Add New Module
         </h1>
            <form className='text-center contentForm'>
                <label htmlFor="title">Title:</label><br></br>
                <textarea  rows="1" cols="100" wrap="soft" type="text" id="title" name="title" defaultValue={title} onChange={ (e) => 
                            {
                                setTitle(e.target.value);
                            }}></textarea><br></br>
                <label htmlFor="subtitle">Subtitle:</label><br></br>
                <textarea rows="5" cols="100" wrap="soft" type="text" id="subtitle" name="subtitle" defaultValue={subtitle} onChange={ (e) => 
                            {
                                setSubtitle(e.target.value);
                            }}></textarea><br></br>
                <label htmlFor="description">Description:</label><br></br>
                <textarea rows="15" cols="100" wrap="soft" type="text" id="description" name="descriptio" defaultValue={description} onChange={ (e) => 
                            {
                                setDescription(e.target.value);
                            }}></textarea><br></br>
                <label htmlFor="banner">Module Banner Image:</label><br></br>
                <input type="file" name="myImage" accept="image/png, image/jpeg" onChange={ (e) => {setBanner(e.target.files); }}/>
            </form>
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
export default  AddContent;

import { Form , Card, Button, Container, Col} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./EditContent.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
* Creates and displays the learning page for each test category. 
* @return { EditContent }
*/
const  EditContent = () => {
    let { slug } = useParams();
    const [currentUser, setCurrentUser] = useState([]);
    const [content, setContent] = useState([])
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [subtitle, setSubtitle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
          setCurrentUser(response.data.user[0])
        }).catch(error => console.error(`Error ${error}`));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3002/api/getModuleInfo', { params: { id: slug } }).then((response) => {
              setContent(Object.values(response.data))
              setIsLoading(false)
          }).catch(error => console.error(`Error ${error}`));
    }, [slug])

    

    useEffect(() => {
        if(!isLoading) {
            let module =  content[0]
            setTitle(module.Title)
            setSubtitle(module.Subtitle)
            setDescription(module.Description)
        }
    }, [isLoading])


    function submitData() {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `UPDATE  LearningModules SET Title = '${title}', Subtitle = '${subtitle}', Description = '${description}' WHERE ID = '${slug}'` } }).then((response) => {
        console.log(response)
        }).catch(error => console.error(`Error ${error}`));
        console.log("We added")
        console.log("Title:", title)
        console.log("Subtitle:", subtitle)
        console.log("Description:", description)

        navigate('/admin-content');
    }


    const ModuleContent = content.map((module) => {
        return ([
          <>
            <h1 className="text-center moduleName">
              Learning Modules: {module.Title} Module
            </h1>
            <form className='text-center contentForm'>
                <label htmlFor="title">Title:</label><br></br>
                <textarea  rows="1" cols="100" wrap="soft" type="text" id="title" name="title" defaultValue={module.Title} onChange={ (e) => 
                            {
                                setTitle(e.target.value);
                            }}></textarea><br></br>
                <label htmlFor="subtitle">Subtitle:</label><br></br>
                <textarea rows="5" cols="100" wrap="soft" type="text" id="subtitle" name="subtitle" defaultValue={module.Subtitle} onChange={ (e) => 
                            {
                                setSubtitle(e.target.value);
                            }}></textarea><br></br>
                <label htmlFor="description">Description:</label><br></br>
                <textarea rows="15" cols="100" wrap="soft" type="text" id="description" name="descriptio" defaultValue={module.Description} onChange={ (e) => 
                            {
                                setDescription(e.target.value);
                            }}></textarea><br></br>
            </form>
    
            </>
        ]);
    })

    return (
        <>
         <div className="EditContentBg img-fluid ">
        {ModuleContent}
        <div className="d-grid gap-2 ">
            <Button variant="primary" className="goToQuizBttn uvs-left uvs-right" onClick={submitData} >
                Submit
            </Button>
          </div>
        </div>
        </>
    );
}
export default  EditContent;

import {Button,  Container} from 'react-bootstrap'
import React from 'react';
import './LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LearningContent from './LearningContent.js';
import { useEffect } from "react";
import { useParams } from "react-router";

/**
 * 
 * @param {str} category Question category to get questions from
 * @param {int} index Index of question in the returned query
 * @param {func} changeState Function to pass into question object to monitor its state
 */
 function getLearningModule(index)
 {
   // The route for axios.get() to use to query the db
   const url = 'http://localhost:3002/api//api/getLearningModule'
 
   // I am unsure why useState() and useEffect() makes this work,
   // but plenty of online examples I viewed used this pattern.
   const [question, getQuestions] = useState([]);
 
   useEffect(() => {
     getQuestionsIncategory();
   }, [])
 
   // Create a GET HTTP request that uses the getCategoryQuestions route to 
   // query the db for questions in the specified category.
   // Then choose a question from the query result using the index param.
   const getQuestionsIncategory = () => {
     axios.get(`${url}`, { params: { filter: category } }).then((response) => {
       const data = response.data
       getQuestions(data[index]);
     }).catch(error => console.error(error));
   }
 
   // Return the question component with question info from the query
   // into the components props.
   return (
     {}
   )
 }

/**
* Creates and displays the learning page for each test category. 
* @return { LearningModule}
*/
const  LearningModule = () => {
    let { slug } = useParams();

    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);

    

    return (
        <>
        
        <Container className=" LearningModuleContainer">
            <LearningContent title={slug} paragraph = "This is some text." />
        </Container>
        <div className="d-grid gap-2">
            <Button variant="primary" href={'/quiz/' + slug}>
                Go to Quiz
            </Button>
        </div>
        </>
    );
}
export default  LearningModule;
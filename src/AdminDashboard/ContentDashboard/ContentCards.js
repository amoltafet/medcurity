import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Row, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import axios from 'axios';
import ContentCard from './ContentCard'
// import env from "react-dotenv";

/**
 * Returns Panels of the Content Cards. These show basic
 * Learning Module information, and contain a button that allows
 * Employers to remove the given learning module
 * @returns 
 */
const ContentsCards = (props) => {
    const [learningModules, setLearningModules] = useState([])


    // Get all of the learningModules
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `SELECT * FROM LearningModules` } }).then((response) => {
            setLearningModules(response.data)
            // // console.log("Modules:", response.data)
            }).catch(error => console.error(`Error ${error}`));
        },[])


    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createContentCards(modules, maxLength=-1) {
        // // console.log(modules)
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; }
            module = modules[index]
            objs.push(<ContentCard learningModuleName={module.Title} moduleId={module.ID} />)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Container >
            <Card className="Content-container uvs-right">
                <Row xs={18} md={12} lg={12}>
                    <Col xs={7} lg={10}>
                <Card.Title className="ContentCardHeader" id="content-title">Current Learning Modules</Card.Title>  
                 </Col>
                 <Col xs={5} lg={2} className="justify-content-right" >
                    <Button className='uvs-left add-btn' href="/add-content">Add Module</Button>  
                 
                 </Col>
                 </Row>   
                <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                    {createContentCards(learningModules)}
                </CardDeck>  
              
            </Card>

          

        </Container>
        </>
    );
}

export default ContentsCards
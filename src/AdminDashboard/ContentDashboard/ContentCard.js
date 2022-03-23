import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './ContentDashboard.css';
import { useEffect, useState } from "react";
import axios from 'axios';

//TODO
// Connect button to remove user functionality

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const ContentCard = (props) => {
    const [questions, setQuestions] = useState([])
 

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeModule() {
        console.log("Removing LearningModule from company");
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `DELETE FROM Questions WHERE module = '${props.moduleId}'` } }).then((response) => {
            console.log("Removing Questions for", props.moduleId)
            }).catch(error => console.error(`Error ${error}`));
        
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `DELETE FROM LearningModules WHERE ID = '${props.moduleId}'` } }).then((response) => {
            console.log("Removing Questions for", props.moduleId)
            }).catch(error => console.error(`Error ${error}`));

        
    }


    return (
        <>
        <Card className="ContentCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col sm>
                <div className="ContentCardValues">{props.learningModuleName}</div>
            </Col>
            <Col sm>
                <Button className="ContentInRowButton uvs-right" 
                        size="sm" 
                        variant="danger"
                        href={"/edit-content/" + props.moduleId}> 
                        Edit Content </Button>
            </Col>
            <Col sm>
                <Button className="ContentInRowButton uvs-right" 
                        size="sm" 
                        variant="danger"
                        href={"/edit-questions/" + props.moduleId}> 
                        Edit Questions </Button>
                </Col>
            <Col sm>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" data-trigger="focus" className="ContentPopup">
                        <div className="ContentCardValues">Please confirm that you want to remove the module '{props.learningModuleName}' from your assigned list of modules: </div> 
                        <Button className="ContentInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeModule(props.moduleId)}
                            href='/admin-content'
                            > 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="ContentInRowButton uvs-right" 
                    size="sm" 
                    variant="danger"
                    > 
                    Remove Module </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default ContentCard;
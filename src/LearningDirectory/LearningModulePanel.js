import {Card} from 'react-bootstrap'
import React from 'react';
import './LearningModulePanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * Create a card object holding the learning module name and props
 * @param {props.id} The id of the module
 * @param {props.title} The title/name of the module
 * @returns Card object with the relevant information
 */
const LearningModulePanel = (props) => {
    var dueDate = new Date(props.dueDate); 
    return (
        <>
        <a href={"/learning-module/" + props.link} style={{ cursor: "pointer" }}className="LearningModulePanelCard uvs-right uvs-left">
            <Card.Body>
               <Card.Title className="testPanelFont" href={"/learning-module/" + props.link} >{props.title}</Card.Title>
               <Card.Text className="dueDateRequiredModule">Due At: {dueDate.toDateString()}</Card.Text> 
            </Card.Body> 
        </a>
        </>
    );
}
export default LearningModulePanel;
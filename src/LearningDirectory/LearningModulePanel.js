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
    return (
        <>
        <Card className="LearningModulePanelCard uvs-right uvs-left">
            <Card.Body>
               <Card.Link className="font" href={"/learning-module/" + props.id} >{props.title}</Card.Link>
            </Card.Body> 
        </Card>
        </>
    );
}
export default LearningModulePanel;
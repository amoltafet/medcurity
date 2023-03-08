import {Card} from 'react-bootstrap'
import React from 'react';
import './LearningModulePanel.css';
import { Button } from '@material-ui/core';


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
        <div className="card card-custom bg-white border-white border-0">
                <div className="card-custom-img card-custom-img-2"></div>
                    <div className="card-custom-avatar">
                        <img className="img-fluid" src={props.img} alt="Card image cap" />
                    </div>
                    <div className="card-body card-body-2">
                        <h4 className="card-title">{props.title}</h4>
                        <p className="card-text">Module {props.link}</p>
                        <h6 className="card-text">{dueDate}</h6>
                    </div>
                    <div className="card-footer card-footer-2" > 
                        <Button variant="outlined" href={"/learning-module/" + props.link}>View</Button>
                    </div>
                   
             </div>
        </>
    );
}
export default LearningModulePanel;
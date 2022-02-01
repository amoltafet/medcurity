import {Card} from 'react-bootstrap'
import React from 'react';
import './TestPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const TestPanel = (props) => {
    return (
        <>
        <Card className="TestPanelCard uvs-right uvs-left">
            <Card.Body>
               <Card.Link className="testPanelFont" href={"/learning-module/" + props.link} >{props.title}</Card.Link>
            </Card.Body>
        </Card>
        </>
    );
}
export default TestPanel;
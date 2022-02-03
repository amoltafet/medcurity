import {Card, Col} from 'react-bootstrap'
import React from 'react';
import './TestPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { CircularProgressbar } from 'react-circular-progressbar';

const TestPanel = (props) => {
    return (
        <>
        <Card className="TestPanelCard uvs-right uvs-left">
            <Card.Body>
                <Col>
               <Card.Link className="testPanelFont" href={"/learning-module/" + props.link} >{props.title}</Card.Link>
            
               <CircularProgressbar
                            className="dashProgressBar"
                            value="0"
                            text="0%"
                            styles={{
                                path: {
                                    stroke: "#1e5b88",
                                },
                                trail: {
                                    stroke: "#d8dae3",
                                },
                                text: {
                                    fill: "white",
                                    textAnchor: "middle",
                                }
                            }} />
                </Col>
            </Card.Body>
        </Card>
        </>
    );
}
export default TestPanel;
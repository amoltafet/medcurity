import {Card} from 'react-bootstrap'
import React from 'react';
import './TestPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const TestPanel = () => {
    return (
        <>
        <Card className="TestPanelCard uvs-right uvs-left">
            <Card.Body>
               <Card.Title>Test</Card.Title>
            </Card.Body> 
        </Card>
        </>
    );
}
export default TestPanel;
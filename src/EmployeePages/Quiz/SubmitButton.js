import { Button, Row , Col} from 'react-bootstrap';
import './SubmitButton.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

export const SubmitButton = (props) => {

    // function to display in the console the question data stored in the data state variable in Quizpage.js
    
    return (
        <Row className="justify-content-center">
            <Col xs  sm="1" >
            <Button id="submitBtn" type="button" className="quizSubmitBttn text-center uvs-left uvs-right" value={props.value} onClick={props.action}>Submit</Button>
            </Col>
        </Row>
        
    )
}

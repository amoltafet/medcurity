import { Row , Col} from 'react-bootstrap';
import './SubmitButton.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from '@mui/material';

import React from 'react'

export const SubmitButton = (props) => {

    // function to display in the console the question data stored in the data state variable in Quizpage.js
    
    return (
        <Row className="justify-content-center">
            <Col xs  sm="1" >
            <Button id="submitBtn" variant="outlined" value={props.value} onClick={props.action} sx={{
                width: '100%',
            }}>Submit</Button>
            </Col>
        </Row>
        
    )
}

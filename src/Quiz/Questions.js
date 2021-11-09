import React from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './Questions.css';


function Questions(props) {
    
    return (
        <>
            <dir> "Hello" </dir>
            <ToggleButtonGroup vertical name="Q1">
                <ToggleButton id = "tbj-check-1" value={1} variant="light">
                    This is my button........................................
                </ToggleButton>
                <ToggleButton id = "tbj-check-2" value={2} variant="light">
                    This is my second button
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}

export default Questions
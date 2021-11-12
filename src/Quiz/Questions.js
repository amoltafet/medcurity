import React from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './Questions.css';


function Questions(props) {
    const answers = props.answers;
    
    return (
        
        <>
            <dir> "Hello" </dir>
            <script>for (answer in answers) {
                <ToggleButton id = "tbj-check-1" value={1} variant="light">
                This is my button........................................
                </ToggleButton>
            }
            </script>
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
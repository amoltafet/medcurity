import React from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './Questions.css';

/**
 * 
 * @param {answers} props 
 */
function Questions(props) {
    const buttonGroup = React.createElement(ToggleButtonGroup, {
        vertical: true,
        name: "Q1"
    }, null)

    for(let answer in props.answers) {
        const button = React.createElement(ToggleButton, {
            id: "tbj-check-1",
            value: 1,
            variant: "light"
          }, "This is my button........................................");
        // button.classList.add('btn')
        // button.addEventListener('click', selectAnswer)
        //answerButtonsElement.appendChild(button)
        buttonGroup.appendChild(button)
    };
    return buttonGroup;
}

function __Questions(props) {
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
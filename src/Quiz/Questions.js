import React from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './Questions.css';

// function construct_questions(props) {
//     const buttonGroup = [];
//     for(let answer in props.answers) {
//         const button = React.createElement(ToggleButton, {
//             id: "tbj-check-1",
//             value: 1,
//             variant: "light"
//         }, "This is my button........................................");
//         // button.classList.add('btn')
//         // button.addEventListener('click', selectAnswer)
//         //answerButtonsElement.appendChild(button)
//         buttonGroup.push(button);
//     };
//     return buttonGroup;
// }

/**
 * 
 * @param {answers} props 
 */
function Questions(props) {

    //const answers = props.answers.map(answer => ) ;
    //const myanswers = ["42", "100", "13"];
    const myanswers = [
        { name: '43', value: '1' },
        { name: '200', value: '2' },
        { name: '13', value: '3' },
    ];

    
    return(
        <>
            <ToggleButtonGroup vertical name="Q1">
                {myanswers.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.name}
                    variant = "light"
                    //checked={radioValue === radio.value}
                    //onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </>
    );
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
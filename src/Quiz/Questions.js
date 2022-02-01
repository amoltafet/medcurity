import React from 'react';
import {ToggleButtonGroup, ToggleButton, Container} from 'react-bootstrap';
import './Questions.css';

/**
 * 
 * @param {Array<str>} answers for the question
 * @param {str} question The question string
 * @param {int} number The question number
 */
function Questions(props) {

    

       /**
     * 
     * @param {!Array{str}} answers 
     * @returns {!Array{obj{answers, values}}}
     */
        function convert_to_list_of_obj(answers) {
            const list_of_obj = []
            for (let i = 0; i < answers.length; i++) {
                const obj = {name: answers[i], value: i + 1};
                list_of_obj.push(obj);
            }
            return list_of_obj;
        }
        const myanswers = convert_to_list_of_obj(props.answers);
    
        const groupID = "q-group" + props.i;


    return(
        <>
            <div id={props.id} className="text-center"> 
             <Container id="questionDesciption" className="questionDesciption">
                {props.question} 
            </Container>
            
            <ToggleButtonGroup id ="answerQuizSelection" className="answerQuizSelection" vertical name={"q-group" + props.i}>
                {myanswers.map((radio, idx) => (
                <ToggleButton 
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="secondary"
                    name="radio "
                    value={radio.name}
                    variant="light"
                    className="individualQuestions"
                    onChange={(e) => props.action(props.i, radio.name)}>
                    {` ${radio.name}`}
                </ToggleButton>
                ))}
            </ToggleButtonGroup>
            </div>
        </>
    );
}

export default Questions
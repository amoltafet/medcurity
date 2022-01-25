import React from 'react';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
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

    return(
        <>
            <div className="questionDesciption text-center"> {props.question} </div>
            <ToggleButtonGroup className="answerQuizSelection uvs-left uvs-right" vertical name="Q1">
                {myanswers.map((radio, idx) => (
                <ToggleButton 
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="secondary"
                    name="radio "
                    value={radio.name}
                    variant = "light"
                    className="individualQuestions">
                    {radio.name}
                </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </>
    );
}

export default Questions
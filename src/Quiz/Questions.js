import React, { useEffect, useState } from 'react';
import {ToggleButtonGroup, ToggleButton, Container, Form} from 'react-bootstrap';
import './Questions.css';

/**
 * 
 * @param {Array<str>} answers for the question
 * @param {str} question The question string
 * @param {int} number The question number
 */
function Questions (props) {

    const [quizToggleId, setQuizToggleId] = useState("group");

    /**
     * 
     * @param {!Array{str}} answers 
     * @returns {!Array{obj{answers, values}}}
     */
    function convert_to_list_of_obj(answers) { // used for multiple-choice questions
        const listOfObj = []
        for (let i = 0; i < answers.length; i++) {
            const obj = {name: answers[i], value: i + 1};
            listOfObj.push(obj);
        }
        return listOfObj;
    }
    
    useEffect(() => {
        setQuizToggleId(props.id)
    },[props.id])
    
    if (props.type === 'mc') { // for multiple-choice questions
        const potentialAnswers = convert_to_list_of_obj(props.answers);
        return(
            <>
                <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
                <div id={props.i} className="text-center"> 
                <Container id="questionDesciption" className={props.classes[1]}>
                    {props.question} 
                </Container>
                
                <ToggleButtonGroup id={quizToggleId} className="answerQuizSelection uvs-left" vertical name={quizToggleId}>
                    {potentialAnswers.map((radio, idx) => (
                    <ToggleButton 
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="light secondary"
                        name="radio"
                        value={radio.name}
                        className="individualQuestions"
                        checked = {props.checked[idx]}
                        onChange={(e) => props.action(props.i, radio.name, idx)}>
                        {` ${radio.name}`}
                    </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                </div>
            </>
        );
    } else if (props.type === 'fill') { // for fill-in-the-blank questions
        return(
            <>
                <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
                <div id={props.i} className="text-center"> 
                <Container id="questionDesciption" className={props.classes[1]}>
                    {props.question} 
                </Container>

                <Form.Control
                    id={quizToggleId}
                    name={quizToggleId}
                    type="text"
                    size="lg"
                    placeholder="Type your answer here..."
                    onChange={(e) => props.action(props.i, e.target.value, 0)}
                />
                </div>
            </>
        );
    }
    return(
        <>
            <p>An error has occurred...</p>
        </>
    );

}

export default Questions
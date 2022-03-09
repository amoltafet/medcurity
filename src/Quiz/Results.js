import { Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import './Questions.css';
function Results(props) {
    

    const [quizToggleId, setQuizToggleId] = useState("group");
    /**
     * 
     * @param {!Array{str}} answers 
     * @returns {!Array{obj{answers, values}}}
     */
    function convert_to_list_of_obj(answers) {
        var list_of_obj = []
        for (let i = 0; i < answers.length; i++) {
            var obj = {name: answers[i], value: i + 1};
            list_of_obj.push(obj);
        }
        return list_of_obj;
    }

    var myanswers = convert_to_list_of_obj(props.answers);

    useEffect(() => {
        setQuizToggleId(props.id)
    },[props.id])

    /* <ToggleButtonGroup id={quizToggleId} className="answerQuizSelection" vertical name={quizToggleId}>
                {myanswers.map((radio, idx) => (
                <ToggleButton 
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="light secondary"
                    name="radio "
                    value={radio.name}
                    className="individualQuestions"
                    onChange={(e) => props.action(props.i, radio.name)}>
                    {` ${radio.name}`}
                </ToggleButton>
                ))}
            </ToggleButtonGroup>
            </div> */
        // function resultContent(index) {
        //     for(var i = 0; i < 4; i++) {
        //         if(props.answerData[props.i]) {
                    
        //         }
        //     }
        // } 

    return(
        <>
            <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
            <div id={props.i} className="text-center"> 
                <Container id="questionDesciption" className={props.classes[1]}>
                    {props.question} 
                </Container>

                <div id={quizToggleId} className="resultsQuizSelection" vertical name={quizToggleId}>
                    {myanswers.map((radio, idx) => (
                        <Container 
                            key={idx} 
                            id={`result-${idx}`}
                            value={radio.name}
                            className="individualResults">
                                {`${radio.name}`}
                            </Container>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Results
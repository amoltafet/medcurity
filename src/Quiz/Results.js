import { Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';

import Result from "./Result";
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


    return(
        <>
            <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
            <Container id={props.i} className="text-center"> 
                <Container id="questionDesciption" className={props.classes[1]}>
                    {props.question} 
                </Container>

                <Row id={quizToggleId} className="resultsQuizSelection" name={quizToggleId}>
                    {myanswers.map((radio, idx) => (
                        <Result index={idx} rad={radio} correctIdx={props.userAnswer} correct={props.isCorrect}></Result>
                    ))}
                </Row>

            </Container>
        </>
    );
}

export default Results
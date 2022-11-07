import { Container, Row, Card } from "react-bootstrap";
import React, { useEffect, useState } from 'react';

import Result from "./Result";

function Results(props) {
    
    const [quizToggleId, setQuizToggleId] = useState("group");

    /**
     * 
     * @param {!Array{str}} answers 
     * @returns {!Array{obj{answers, values}}}
     */
    function convert_to_list_of_obj(answers) { // used for multiple-choice questions
        var listOfObj = []
        for (let i = 0; i < answers.length; i++) {
            var obj = {name: answers[i], value: i + 1};
            listOfObj.push(obj);
        }
        return listOfObj;
    }

    useEffect(() => {
        setQuizToggleId(props.id)
    }, [props.id])

    if (props.type === 'mc') { // for multiple-choice questions
        var potentialAnswers = convert_to_list_of_obj(props.answers);
        return(
            <>
            <Card className="resultsCard">
                <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
                <Container id={props.i} className="text-left resultsContainerQuestionBottom"> 
                    <Container id="questionDesciption" className={props.classes[1]}>
                        {props.question} 
                    </Container>

                    <Row id={quizToggleId} className="resultsQuizSelection" name={quizToggleId}>
                        {potentialAnswers.map((radio, idx) => (
                            <Result index={idx} type={props.type} rad={radio} correctIdx={props.userRadioAnswerIndex} correct={props.isCorrect}></Result>
                        ))}
                    </Row>

                </Container>
                </Card>
            </>
        );
    } else if (props.type === 'fill') { // for fill-in-the-blank questions
        return(
            <>
            <Card className="resultsCard">
                <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
                <Container id={props.i} className="text-left resultsContainerQuestionBottom"> 
                    <Container id="questionDesciption" className={props.classes[1]}>
                        {props.question} 
                    </Container>

                    <Row id={quizToggleId} className="resultsQuizSelection" name={quizToggleId}>
                        <Result index={0} type={props.type} userFillInAnswer={props.userFillInAnswer} correct={props.isCorrect}></Result>
                    </Row>

                </Container>
                </Card>
            </>
        );
    }
    return(
        <>
            <p>An error has occurred...</p>
        </>
    );

}

export default Results
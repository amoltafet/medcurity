import React, { useEffect, useState } from 'react';
import {ToggleButtonGroup, ToggleButton, Container, Form} from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './Questions.css';

/**
 * 
 * @param {Array<str>} answers for the question
 * @param {str} question The question string
 * @param {int} number The question number
 */
function Questions (props) {

    const [quizToggleId, setQuizToggleId] = useState("group");

    // For keeping track of order of the two lists involved in matching questions
    const [answerList, setAnswerList] = useState([]);
    const [matchingAnswerList, setMatchingAnswerList] = useState([]);

    useEffect(() => {
        if (props.type === 'match') {
            setAnswerList(props.answers);
        }
    }, [props.answers])

    useEffect(() => {
        if (props.type === 'match') {
            setMatchingAnswerList(props.matchinganswers);
        }
    }, [props.matchinganswers])

    useEffect(() => {
        if (props.type === 'match') {
            props.action(props.i, [answerList, matchingAnswerList], 0);
        }
    }, [answerList, matchingAnswerList])

    // Function to update answerList on drop
    const handleAnswerListDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...answerList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update state
        setAnswerList(updatedList);
    };

    // Function to update matchingAnswerList on drop
    const handleMatchingAnswerListDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...matchingAnswerList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update state
        setMatchingAnswerList(updatedList);
    };

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
    } else if (props.type === 'match') { // for matching questions
        return(
            <>
                <h3 id="qNumber" className={props.classes[0]}> Question {props.i + 1} </h3>
                <div id={props.i} className="text-center"> 
                <Container id="questionDesciption" className={props.classes[1]}>
                    {props.question} 
                </Container>

                <div>
                    <DragDropContext onDragEnd={handleAnswerListDrop}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div
                                    className="list-container"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {answerList.map((answer, index) => (
                                        <Draggable key={answer} draggableId={answer} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="item-container"
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                >
                                                    {answer}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div>
                    <DragDropContext onDragEnd={handleMatchingAnswerListDrop}>
                        <Droppable droppableId="list-container">
                            {(provided) => (
                                <div
                                    className="list-container"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {matchingAnswerList.map((matchingAnswer, index) => (
                                        <Draggable key={matchingAnswer} draggableId={matchingAnswer} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="item-container"
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                >
                                                    {matchingAnswer}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

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
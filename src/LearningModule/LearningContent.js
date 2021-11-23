import React from 'react';
import './LearningContent.css';

/**
 * 
 * @param {Array<str>} answers for the question
 * @param {str} question The question string
 * @param {int} number The question number
 */
function LearningContent(props) {

    return (
        <>
            <h1>{props.title}</h1>
            <div>{props.paragraph}</div>
        </>
    );
}

export default LearningContent
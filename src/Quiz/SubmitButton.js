import './SubmitButton.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

export const SubmitButton = (props) => {

    // function to display in the console the question data stored in the data state variable in Quizpage.js
    function displayQuestionData() {
        for(var i= 0; i < 3; i++) {
            var newData = props.questionData[i];
            console.log("" + newData["answer"]);
        }
    }
    return (
        <div id="submit-btn">
            <input type="button" className="quizSubmitBttn uvs-left uvs-right" value={props.value} onClick={displayQuestionData}></input>

        </div>
    )
}

import './SaveAllButton.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

export const SaveAllButton = (props) => {

    // function to display in the console the question data stored in the data state variable in Quizpage.js
    function saveQuestionData() {
        for(var i= 0; i < 3; i++) {
            var newData = props.questionData[i];
            console.log("selected answer" + newData["answer"]);
        }
    }
    return (
        <div id="save-all-btn">
            <input type="button" className="saveAllBttn uvs-left uvs-right" value={props.value} onClick={saveQuestionData}></input>
        </div>
    )
}

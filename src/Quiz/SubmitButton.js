import './SubmitButton.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

export const SubmitButton = (props) => {

    // function to display in the console the question data stored in the data state variable in Quizpage.js
    
    return (
        <div >
            <input id="submit-btn" type="button" className="quizSubmitBttn text-center uvs-left uvs-right disabled" value={props.value} onClick={props.action}></input>
        </div>
    )
}

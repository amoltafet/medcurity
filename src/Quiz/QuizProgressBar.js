import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

function QuizProgressBar (props) {

    return (
        <>
        <ProgressBar
            percent={props.percentage}
            unfilledBackground="#C8C8C8"
            filledBackground="linear-gradient(to right, #73daff, #2743f5)"
        />
        </>
    );

}

export default QuizProgressBar
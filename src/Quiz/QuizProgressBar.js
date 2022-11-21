import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function QuizProgressBar (props) {

    function generateArray(arraySize) {
        var generatedArray = [];
        for (var i = 1; i <= arraySize; i++) {
            generatedArray.push(i);
        }
        return generatedArray;
    }

    var fillerArray = generateArray(props.numQuestions);

    return (
        <>
        <ProgressBar
            percent={props.percentage}
            unfilledBackground="#C8C8C8"
            filledBackground="linear-gradient(to right, #73daff, #2743f5)"
            hasStepZero={false}
        >
            {fillerArray.map((num) => (
                <Step transition="scale" index={num - 1}>
                {({ accomplished }) => (
                  <img
                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                    width="30"
                    src="/progress_bar_step.svg"
                  />
                )}
                </Step>
            ))}
        </ProgressBar>
        </>
    );

}

export default QuizProgressBar
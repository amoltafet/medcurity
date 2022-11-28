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
            height={5}
            unfilledBackground="#C8C8C8"
            filledBackground="linear-gradient(to right, #73daff, #2743f5)"
            hasStepZero={false}
        >
            {fillerArray.map((num) => (
                <Step transition="scale" transitionDuration={450} index={num - 1}>
                {({ accomplished }) => (
                  <img
                    style={{ filter: `grayscale(${accomplished ? 0 : 90}%)` }}
                    width="25"
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
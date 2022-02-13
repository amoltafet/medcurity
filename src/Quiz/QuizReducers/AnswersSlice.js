import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    answers: [],
}


const AnswerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        addAnswer: (state, action) => {
            console.log("question number", action.payload[0]);
            console.log("answer chosen", action.payload[1]);
            if (state.answers.length !== 0) { 
                for (var i = 0; i < state.answers.length; i++) {
                    if (action.payload[1] !== state.answers[i][1]) {
                        state.answers.push(action.payload);
                    }
                }
                for (var i = 0; i < state.answers.length; i++) {
                    if (action.payload[1] === state.answers[i][1]) {
                        state.answers[i][0] = action.payload[0];
                    }
                }
            }
            else {
                console.log("u should wokre")
                state.answers.push(action.payload);
                console.log(state.answers)
            }

            console.log("answers", state.answers);
        },
    },
})

export default AnswerSlice.reducer;

export const selectAnswers = (state) => state.answers.answers;

export const { addAnswer } = AnswerSlice.actions;

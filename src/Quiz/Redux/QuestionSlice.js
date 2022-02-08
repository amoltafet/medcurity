import { createSlice } from '@reduxjs/toolkit';

export const QuestionSlice = createSlice({
    name: 'questions',
    initialState: {
        question:  {
            questionNumber: 0,
            questionDesciption: "",
            solution: "",
            a1: "",
            a2: "", 
            a3: "",
            selectedAnswer: "" 
        },
        allQuestions: [],
    },
    reducers: {
        increment: (state, action, quizSize, quiz, toggleId) => {
            state.question.questionNumber -= 1;
        },
        decrement: (state, action, quiz, toggleId) => {
            if (action !== 0) {
                state.question.questionNumber -= 1;
            }
        },
        selectedAnswer: (state, action) => {

        }
    },
});

export const { increment, decrement } = QuestionSlice.actions;

export const selectQuestion = state => state.questions.question;

export default QuestionSlice.reducer;

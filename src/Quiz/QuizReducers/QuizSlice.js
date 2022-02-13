import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    quiz: [],
    question: {
        number: 0,
        description: "",
        answers: {
            solution: "",
            a1: "",
            a2: "",
            a3: "",
        },
    },
    status: 'idle',
    error: null,
}

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async (slug) => {
    const response = await axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } });
    return response.data
})

const QuizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        incrementQuestion: (state, action, length) => {
            if (action.payload !== length) {
                state.question.number += 1;
            }
        },
        decrementQuestion: (state, action) => {
            if (action.payload !== 0) {
                state.question.number -= 1;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuiz.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.quiz = state.quiz.concat(action.payload)
                state.question.number = 0;
                state.question.description = action.payload[0].question;
                state.question.answers.solution = action.payload[0].solution;
                state.question.answers.a1 = action.payload[0].a2;
                state.question.answers.a2 = action.payload[0].a3;
                state.question.answers.a3 = action.payload[0].a4;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default QuizSlice.reducer;

export const selectQuiz = (state) => state.quiz.quiz;
export const selectQuestion = (state) => state.quiz.question;

import { configureStore } from '@reduxjs/toolkit';
import  quizReducer  from './Quiz/QuizReducers/QuizSlice';
import answerReducer from './Quiz/QuizReducers/AnswersSlice';

export default configureStore({
  reducer: {
    quiz: quizReducer,
    answers: answerReducer,
  },
})

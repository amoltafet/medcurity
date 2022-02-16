import { combineReducers } from 'redux';
import quizReducer from './Quiz/QuizReducers/QuizSlice';

export default combineReducers({
  quizList: quizReducer,
});
import { combineReducers } from 'redux';
import quizReducer from './Quiz/QuizReducers/QuizReducer';
import questionList from './Quiz/QuizReducers/QuestionReducer';

export default combineReducers({
  quizList: quizReducer,
  questionList: questionList
});
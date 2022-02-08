// import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';


// const initalState = {

// }

// const middleware = [thunk]

// const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import QuestionReducer from './Quiz/Redux/QuestionSlice';
import QuizReducer from './Quiz/Redux/QuizSlice';

export default configureStore ({
  reducer: {
    question: QuestionReducer,
    quiz: QuizReducer,
  },
});

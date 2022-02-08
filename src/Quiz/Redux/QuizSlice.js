import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const QuizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quiz: [],
  },
  reducers: {
    getData: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { getData } = QuizSlice.actions;

// returns null 
export const getDatabase = createAsyncThunk('/Redux/getDatabase', async (slug) => {
    try {
        const response = await axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } })
        return response.data
    }
    catch (e) {
        console.log(e);
    }
})


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectQuiz = state => QuizSlice.quiz.quiz;

export default QuizSlice.reducer;

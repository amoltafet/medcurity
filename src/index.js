import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import DashboardPage from './Dashboard/DashboardPage';
import SettingsPage from './Settings/SettingsPage';
import LoginPage from './Login/LoginPage';
import Leaderboard from './Leaderboard/LeaderboardPage';
import reportWebVitals from './reportWebVitals';
import QuizPage from './Quiz/QuizPage';
import LearningPage from './LearningModule/LearningPage';
import LearningModules from './LearningModule/LearningModules';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/dash" element={<DashboardPage />} />
      <Route path="/settings" element={<SettingsPage />}/>
      <Route path="/quiz" element={<QuizPage />}/>
      <Route path="/learning-module" element={<LearningModules />}>
        <Route path="" element={<LearningModules />} />
        <Route path=":slug" element={<LearningPage />} />
      </Route>
      <Route path="/leaderboard" element={<Leaderboard />}/>
     
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

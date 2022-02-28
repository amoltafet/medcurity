import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import DashboardPage from './EmployeePages/Dashboard/DashboardPage';
import SettingsPage from './EmployeePages/Settings/SettingsPage';
import LoginPage from './EmployeePages/Login/LoginPage';
import RegisterPage from './EmployeePages/Register/RegisterPage';
import Leaderboard from './EmployeePages/Leaderboard/LeaderboardPage';
import reportWebVitals from './reportWebVitals';
import QuizPage from './EmployeePages/Quiz/QuizPage';
import LearningPage from './EmployeePages/LearningModule/LearningPage';
import LearningModule from './EmployeePages/LearningModule/LearningModule';
import LearningModules from './EmployeePages/LearningModule/LearningModules';
import LearningDirectory from './EmployeePages/LearningDirectory/LearningDirectory';
import LearningDirectoryPage from './EmployeePages/LearningDirectory/LearningDirectoryPage';
import LearningDirectoryRequiredPage from './EmployeePages/LearningDirectory/LearningDirectoryRequiredPage';
import QuizModules from './EmployeePages/Quiz/QuizModules';
import QuizBackground from './EmployeePages/Quiz/QuizBackground';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/dash" element={<DashboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />,
        <Route path="/quiz" element={<QuizBackground />}>
          <Route path="" element={<QuizModules />} />
          <Route path=":slug" element={<QuizPage />} />
        </Route>
      <Route path="/learning-module" element={<LearningPage />}>
        <Route path="" element={<LearningModules />} />
        <Route path=":slug" element={<LearningModule />} />
      </Route>
      <Route path="/learning-directory" element={<LearningDirectory />}>
        <Route path="" element={<LearningDirectoryRequiredPage />}/>
        <Route path=":slug" element={<LearningDirectoryPage />} />
      </Route>
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

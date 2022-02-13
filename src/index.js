import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import DashboardPage from './Dashboard/DashboardPage';
import SettingsPage from './Settings/SettingsPage';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import Leaderboard from './Leaderboard/LeaderboardPage';
import reportWebVitals from './reportWebVitals';
import QuizPage from './Quiz/QuizPage';
import LearningPage from './LearningModule/LearningPage';
import LearningModule from './LearningModule/LearningModule';
import LearningModules from './LearningModule/LearningModules';
import LearningDirectory from './LearningDirectory/LearningDirectory';
import LearningDirectoryPage from './LearningDirectory/LearningDirectoryPage';
import LearningDirectoryRequiredPage from './LearningDirectory/LearningDirectoryRequiredPage';
import QuizModules from './Quiz/QuizModules';
import QuizBackground from './Quiz/QuizBackground';
import Store from './Store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";

ReactDOM.render(
<Provider store={Store}>
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
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

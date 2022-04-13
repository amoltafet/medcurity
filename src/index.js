import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import InvalidPage from './InvalidPage/InvalidPage';
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
import EmployerDashboard from './EmployerDashboard/EmployerDashboard';
import LearningManagerDashboard from './LearningManager/LearningManagerDashboard';
import QuizModules from './Quiz/QuizModules';
import QuizBackground from './Quiz/QuizBackground';
import AdminContentPage from "./AdminDashboard/ContentDashboard/ContentDashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboardPage from "./AdminDashboard/AddEmployerPage/AdminDashboard";
import EditContentSlug from "./AdminDashboard/ContentDashboard/EditContentSlug";
import EditContent from "./AdminDashboard/ContentDashboard/EditContent";
import EditContentBackground from "./AdminDashboard/ContentDashboard/EditContentBackground"
import EditQuestionBackground from "./AdminDashboard/ContentDashboard/EditQuestionBackground"
import EditQuestionSlug from "./AdminDashboard/ContentDashboard/EditQuestionSlug"
import EditQuestion from "./AdminDashboard/ContentDashboard/EditQuestion";
import AddContent from "./AdminDashboard/ContentDashboard/AddContent";
import ResetPasswordPage from "./ResetPassword/Reset";

import axios from 'axios';

axios.get("http://localhost:3002/users/login").then((response) => {
  //console.log('is working???', response.data.user) 
})

ReactDOM.render(

  <Router>
    <Routes>
      <Route path="*" element={<InvalidPage />}/>
      <Route path="/" element={<LoginPage />}/>  
      <Route path="/resetPassword" element={<ResetPasswordPage/>}/>
      <Route path="/register" element={<RegisterPage />}/>
      {<Route path="/dash" element={<DashboardPage />} />}
      <Route path="/employer-dash" element={<EmployerDashboard />} />
      <Route path="/admin-dash" element={<AdminDashboardPage />} />
      <Route path="/admin-content" element={<AdminContentPage />} />
      <Route path="/edit-content" element={<EditContentBackground />}>
        <Route path="" element={<EditContentSlug />} />
        <Route path=":slug" element={<EditContent />} />
      </Route>
      <Route path="/add-content" element={<AddContent />} />
      <Route path="/edit-questions" element={<EditQuestionBackground />}>
        <Route path="" element={<EditQuestionSlug />} />
        <Route path=":slug" element={<EditQuestion />} />
      </Route>
      <Route path="/learning-manager" element={<LearningManagerDashboard />} />
      <Route path="/settings" element={<SettingsPage />} />,
      <Route path="/quiz" element={<QuizBackground />}>
        <Route path="" element={<QuizModules />} />
        <Route path=":slug" element={<QuizPage />} />
      </Route>
      <Route path="/learning-module" element={<LearningPage />}>
        <Route path="" element={<LearningModules />} />
        <Route path=":slug" element={<LearningModule />} />
      </Route>
      {/* <Route path="/learning-directory" element={<LearningDirectory />}>
        <Route path="" element={<LearningDirectoryRequiredPage />}/>
        <Route path=":slug" element={<LearningDirectoryPage />} />
      </Route> */}
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
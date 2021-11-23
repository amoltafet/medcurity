import ReactDOM from 'react-dom';
import './index.css';
import DashboardPage from './Dashboard/DashboardPage';
import SettingsPage from './Settings/SettingsPage';
import LoginPage from './Login/LoginPage';
import Leaderboard from './Leaderboard/LeaderboardPage';
import reportWebVitals from './reportWebVitals';
import QuizPage from './Quiz/QuizPage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/dash" component={DashboardPage} />
      <Route exact path="/settings" component={SettingsPage}/>
      <Route exact path="/quiz" component={QuizPage}/>
      <Route exact path="/leaderboard" component={Leaderboard}/>
     
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

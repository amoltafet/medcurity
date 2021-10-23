import ReactDOM from 'react-dom';
import './index.css';
import App from './Dashboard/App';
import SettingsImage from './SettingsImage';
import LoginPage from './Login/LoginPage';
import QuizImage from './QuizImage';
import LeaderboardImage from './LeaderboardImage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/dashboard" component={App} />
      <Route exact path="/settings" component={SettingsImage}/>
      <Route exact path="/quiz" component={QuizImage}/>
      <Route exact path="/leaderboard" component={LeaderboardImage}/>

    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

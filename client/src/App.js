import './App.css';

import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'

import LoginPage from './screens/login/LoginPage';
import RegisterPage from './screens/register/RegisterPage';
import StartPage from './screens/start/StartPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/register"><RegisterPage /></Route>
          <Route path="/start"><StartPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
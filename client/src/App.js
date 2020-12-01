import './App.css';

import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'

import LoginPage from './screens/login/LoginPage';
import StartPage from './screens/start/StartPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/start"><StartPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
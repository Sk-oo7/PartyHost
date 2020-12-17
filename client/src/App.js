import './App.css';

import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'

import LoginPage from './screens/login/LoginPage';
import RegisterPage from './screens/register/RegisterPage';
import MainPage from './components/homepage/MainPage';
import StartPage from './screens/start/StartPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact><MainPage/><Footer/></Route>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/register"><RegisterPage /></Route>
          {/* <Route path="/start"><StartPage /></Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import logo from './img/SubjecTutor.png';
import './App.css';
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import TutorContainer from './containers/TutorContainer'
import StudentContainer from './containers/StudentContainer'
import TutorLogIn from './components/TutorLogIn'
import StudentLogIn from './components/StudentLogIn'
import TutorSignUp from './components/TutorSignUp'
import StudentSignUp from './components/StudentSignUp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to='/'><img src={logo} alt="logo" /></Link>
          <NavLink to='/'>Home</NavLink>
        </header>
        <Switch>
          <Route exact path='/' render={(props) => <HomeContainer {...props}/>} />
          <Route exact path='/tutor' render={(props) => <TutorContainer {...props}/>} />
          <Route exact path='/tutor/login' render={(props) => <TutorLogIn {...props}/>} />
          <Route exact path='/tutor/signup' render={(props) => <TutorSignUp {...props}/>} />
          <Route exact path='/student' render={(props) => <StudentContainer {...props}/>} />
          <Route exact path='/student/login' render={(props) => <StudentLogIn {...props}/>} />
          <Route exact path='/student/signup' render={(props) => <StudentSignUp {...props}/>} />
          <Route render={() => <h1>404 Error Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;

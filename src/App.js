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
import StudentAuthorize from './components/StudentAuthorize'
import TutorAuthorize from './components/TutorAuthorize'

class App extends Component {


  render() {

    const AuthTutorContainer = TutorAuthorize(TutorContainer)
    const AuthTutorLogIn = TutorAuthorize(TutorLogIn)
    const AuthTutorSignUp = TutorAuthorize(TutorSignUp)
    const AuthStudentContainer = StudentAuthorize(StudentContainer)
    const AuthStudentLogIn = StudentAuthorize(StudentLogIn)
    const AuthStudentSignUp = StudentAuthorize(StudentSignUp)

    return (
      <div className="App">
        <header>
          <Link to='/'><img src={logo} alt="logo" /></Link>
          <NavLink to='/'>Home</NavLink>
        </header>
        <Switch>
          <Route exact path='/' render={(props) => <HomeContainer {...props}/>} />
          <Route exact path='/tutor' render={(props) => <AuthTutorContainer {...props}/>} />
          <Route exact path='/tutor/login' render={(props) => <AuthTutorLogIn {...props}/>} />
          <Route exact path='/tutor/signup' render={(props) => <AuthTutorSignUp {...props}/>} />
          <Route exact path='/student' render={(props) => <AuthStudentContainer {...props}/>} />
          <Route exact path='/student/login' render={(props) => <AuthStudentLogIn {...props}/>} />
          <Route exact path='/student/signup' render={(props) => <AuthStudentSignUp {...props}/>} />
          <Route render={() => <h1>404 Error Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;

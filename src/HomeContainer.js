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

import { connect } from 'react-redux'
class BeefContainer extends Component {


  render() {

    const AuthTutorContainer = TutorAuthorize(TutorContainer)
    const AuthTutorLogIn = TutorAuthorize(TutorLogIn)
    const AuthTutorSignUp = TutorAuthorize(TutorSignUp)
    const AuthStudentContainer = StudentAuthorize(StudentContainer)
    const AuthStudentLogIn = StudentAuthorize(StudentLogIn)
    const AuthStudentSignUp = StudentAuthorize(StudentSignUp)
    console.log("Rendering App", localStorage.getItem('student_jwt_token'))
    return (
      <div className="App">
        <header>
          <Link to='/home'><img src={logo} alt="logo" /></Link>
          <NavLink to='/home'>Home</NavLink>
        </header>
        <Switch>
          <Route exact path='/home' render={(props) => <HomeContainer {...props} />} />
          <Route exact path='/tutor/signup' render={(props) => <AuthTutorSignUp {...props} />} />
          <Route exact path='/tutor/login' render={(props) => <AuthTutorLogIn {...props} />} />
          <Route exact path='/tutor' render={(props) => <AuthTutorContainer {...props} />} />
          <Route exact path='/student/signup' render={(props) => <AuthStudentSignUp {...props} />} />
          <Route exact path='/student/login' render={(props) => <AuthStudentLogIn {...props} />} />

          <Route path="/student" render={(props) => {
              return <p>Hello guys</p>
          }}/>
          <Route exact path='/student' render={(props) => {
              console.log("Rendering Student Container")
              return <AuthStudentContainer {...props} />
            }} />
          <Route render={(props) => <HomeContainer {...props}/>} />
        </Switch>
      </div>
    );
  }
}



function mapStateToProps(state) {
  console.log(state.student)
  return {
    currentUser: state.student
  }
}

export default connect(mapStateToProps)(BeefContainer);

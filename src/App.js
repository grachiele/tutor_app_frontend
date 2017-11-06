import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import TutorContainer from './containers/TutorContainer'
import StudentContainer from './containers/StudentContainer'
import TutorLogIn from './components/TutorLogIn'
import StudentLogIn from './components/StudentLogIn'
import TutorSignUp from './components/TutorSignUp'
import TutorSearch from './components/TutorSearch'
import StudentSignUp from './components/StudentSignUp'
import StudentSearch from './components/StudentSearch'
import StudentAuthorize from './components/StudentAuthorize'
import TutorAuthorize from './components/TutorAuthorize'
import { connect } from 'react-redux'
import { retrieveStudentInfo } from './actions/students'
import { retrieveTutorInfo } from './actions/tutors'
import NavBar from './components/NavBar'
import { subjectFetcher } from './actions/fetches'
import { studentsFetcher } from './actions/fetches'
import { tutorsFetcher } from './actions/fetches'

class App extends Component {

  constructor(props){
    super(props)
    const tutor_jwt_token = localStorage.getItem('tutor_jwt_token')
    const student_jwt_token = localStorage.getItem('student_jwt_token')
    if (student_jwt_token) {
      props.retrieveStudentInfo(student_jwt_token)
    }
    if (tutor_jwt_token) {
      props.retrieveTutorInfo(tutor_jwt_token)
    }
    props.getSubjects()
    props.getStudents()
    props.getTutors()
  }

  render() {

    const AuthTutorContainer = TutorAuthorize(TutorContainer)
    const AuthTutorLogIn = TutorAuthorize(TutorLogIn)
    const AuthTutorSignUp = TutorAuthorize(TutorSignUp)
    const AuthTutorSearch = TutorAuthorize(TutorSearch)
    const AuthStudentContainer = StudentAuthorize(StudentContainer)
    const AuthStudentLogIn = StudentAuthorize(StudentLogIn)
    const AuthStudentSignUp = StudentAuthorize(StudentSignUp)
    const AuthStudentSearch = StudentAuthorize(StudentSearch)

    return (
      <div className="App">
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path='/home' render={(props) => <HomeContainer {...props} />} />
          <Route exact path='/tutor/signup' render={(props) => <AuthTutorSignUp {...props} />} />
          <Route exact path='/tutor/search' render={(props) => <AuthTutorSearch {...props} />} />
          <Route exact path='/tutor/login' render={(props) => <AuthTutorLogIn {...props} />} />
          <Route exact path='/tutor' render={(props) => <AuthTutorContainer {...props} />} />
          <Route exact path='/student/signup' render={(props) => <AuthStudentSignUp {...props} />} />
          <Route exact path='/student/search' render={(props) => <AuthStudentSearch {...props} />} />
          <Route exact path='/student/login' render={(props) => <AuthStudentLogIn {...props} />} />
          <Route exact path='/student' render={(props) => <AuthStudentContainer {...props} />} />
          <Route render={(props) => <HomeContainer {...props}/>} />
        </Switch>
      </div> 
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    retrieveStudentInfo: (jwt_token) => {
      dispatch(retrieveStudentInfo(jwt_token))
    },
    retrieveTutorInfo: (jwt_token) => {
      dispatch(retrieveTutorInfo(jwt_token))
    },
    getSubjects: () => {
      dispatch(subjectFetcher())
    },
    getStudents: () => {
      dispatch(studentsFetcher())
    },
    getTutors: () => {
      dispatch(tutorsFetcher())
    }
  }
}

function mapStateToProps(state) {
  return {
    currentStudent: state.student,
    currentTutor: state.tutor
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

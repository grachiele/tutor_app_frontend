import React from 'react'
import { Redirect } from 'react-router-dom'

function StudentAuthorize(RenderedComponent) {
  return class extends React.Component {


    render() {
      if (!localStorage.getItem('student_jwt_token') && this.props.location.pathname !== "/student/login" && this.props.location.pathname !== '/student/signup') {
        return <Redirect to="/student/login" />
      } else if (localStorage.getItem('student_jwt_token') && (this.props.location.pathname === "/student/login" || this.props.location.pathname === '/student/signup')){
        return <Redirect to="/student" />
      } else if (localStorage.getItem('tutor_jwt_token')) {
        return <Redirect to="/home" />
      } else {
        return <RenderedComponent {...this.props}/>
      }

    }
  }
}

export default StudentAuthorize

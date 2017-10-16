import React from 'react'
import { Redirect } from 'react-router-dom'

function StudentAuthorize(RenderedComponent) {
  return class extends React.Component {
    constructor(){
      super()
    }

    render() {
      if (!localStorage.getItem('student_jwt_token') && this.props.location.pathname !== "/student/login" && this.props.location.pathname !== '/student/signup') {
        return <Redirect to="/student/login" />
      } else if (localStorage.getItem('student_jwt_token') && (this.props.location.pathname === "/student/login" || this.props.location.pathname === '/student/signup')){
        return <Redirect to="/student" />
      } else {
        return <RenderedComponent />
      }

    }
  }
}

export default StudentAuthorize

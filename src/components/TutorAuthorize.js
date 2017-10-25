import React from 'react'
import { Redirect } from 'react-router-dom'

function TutorAuthorize(RenderedComponent, props) {
  return class extends React.Component {

    constructor(props){
      super(props)
    }

    render() {
      if (!localStorage.getItem('tutor_jwt_token') && this.props.location.pathname !== "/tutor/login" && this.props.location.pathname !== '/tutor/signup') {
        return <Redirect to="/tutor/login"/>
      } else if (localStorage.getItem('tutor_jwt_token') && (this.props.location.pathname === "/tutor/login" || this.props.location.pathname === '/tutor/signup')){
        return <Redirect to="/tutor/search" />
      } else if (localStorage.getItem('student_jwt_token')) {
        return <Redirect to="/student/search" />
      } else {
        return <RenderedComponent {...this.props}/>
      }

    }
  }
}

export default TutorAuthorize

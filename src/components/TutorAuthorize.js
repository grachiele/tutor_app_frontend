import React from 'react'
import { Redirect } from 'react-router-dom'

function TutorAuthorize(RenderedComponent) {
  return class extends React.Component {
    constructor(){
      super()
    }

    render() {
      if (!localStorage.getItem('tutor_jwt_token') && this.props.location.pathname !== "/tutor/login" && this.props.location.pathname !== '/tutor/signup') {
        return <Redirect to="/tutor/login"/>
      } else if (localStorage.getItem('tutor_jwt_token') && (this.props.location.pathname === "/tutor/login" || this.props.location.pathname === '/tutor/signup')){
        return <Redirect to="/tutor" />
      } else {
        return <RenderedComponent />
      }

    }
  }
}

export default TutorAuthorize

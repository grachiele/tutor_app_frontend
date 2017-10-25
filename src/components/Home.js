import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
class Home extends React.Component {

  render() {

    if (!(localStorage.getItem('student_jwt_token') || localStorage.getItem('tutor_jwt_token'))){
      return(
        <div>
            <h1>For Tutors</h1>
            <Link to="/tutor/login"><Button color='teal'>Log In</Button></Link>
            <Link to="/tutor/signup"><Button color='teal'>Sign Up</Button></Link>
            <h1>For Students</h1>
            <Link to="/student/login"><Button color='teal'>Log In</Button></Link>
            <Link to="/student/signup"><Button color='teal'>Sign Up</Button></Link>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Home

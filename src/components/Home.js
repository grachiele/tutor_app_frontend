import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  render() {
    return(
      <div>
        <h1>For Tutors</h1>
        <Link to="/tutor/login"><button>Log In</button></Link>
        <Link to="/tutor/signup"><button>Sign Up</button></Link>
        <h1>For Students</h1>
        <Link to="/student/login"><button>Log In</button></Link>
        <Link to="/student/signup"><button>Sign Up</button></Link>
      </div>
    )
  }
}

export default Home

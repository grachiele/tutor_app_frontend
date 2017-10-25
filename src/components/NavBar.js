import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import logo from './img/SubjecTutor.png';

class NavBar extends React.Component {
  constructor() {
    super()
  }

  signOut = () => {
    let student_jwt_token = localStorage.getItem('student_jwt_token')
    if (student_jwt_token) {
      localStorage.removeItem('student_jwt_token')
    } else {
      localStorage.removeItem('tutor_jwt_token')
    }
  }

  render() {
    const student_jwt_token = localStorage.getItem('student_jwt_token')
    const tutor_jwt_token = localStorage.getItem('tutor_jwt_token')
    return(
      <div>
      <Menu stackable>
        {!(student_jwt_token || tutor_jwt_token) ? <Menu.Item><NavLink to='/home'><img src={logo} alt="logo" /></NavLink></Menu.Item> : null}
        {student_jwt_token ? <Menu.Item><NavLink to='/student/search'><img src={logo} alt="logo" /></NavLink></Menu.Item> : null}
        {tutor_jwt_token ? <Menu.Item><NavLink to='/tutor/search'><img src={logo} alt="logo" /></NavLink></Menu.Item> : null}
        {student_jwt_token ? <Menu.Item><NavLink to='/student'>Preferences</NavLink></Menu.Item> : null}
        {tutor_jwt_token ? <Menu.Item><NavLink to='/tutor'>Preferences</NavLink></Menu.Item> : null}
        {tutor_jwt_token || student_jwt_token ? <Menu.Item name='sign-out'><NavLink to='/home' onClick={this.signOut}>Sign Out</NavLink></Menu.Item> : null}<br />
      </Menu>
      <div>
      </div>
    </div>
    )
  }
}

export default NavBar

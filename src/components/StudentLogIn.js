import React from 'react'
import { Redirect } from 'react-router-dom'
import { logInStudent } from '../actions/students'
import { connect } from 'react-redux'

class StudentLogIn extends React.Component {

  constructor(){
    super()

    this.state = {
      email: "",
      password: ""
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    this.props.logInStudent({
      email: this.state.email.toLowerCase(),
      password: this.state.password
    })

  }

  render(){
    console.log("Rendering login")
    return(
      <div>
        <h1>Student Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>E-mail: </label>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} /><br /><br />
          <label>Password: </label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /><br /><br />
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logInStudent: (studentInfo) => {
      dispatch(logInStudent(studentInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(StudentLogIn)


// how do i re render
// setState({}) // Redux
// 
// App -> render
//  StudentAuthLogin -> render(){}
//   -> Login Form -> render() {}

import React from 'react'

class TutorLogIn extends React.Component {

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

export default TutorLogIn

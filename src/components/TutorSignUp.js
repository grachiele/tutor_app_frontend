import React from 'react'

class TutorSignUp extends React.Component {

  constructor(){
    super()

    this.state = {

    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render(){
    return(
      <div>
        <h1>Tutor Sign Up</h1>
        <form>
          <label>First Name: </label>
          <input type="text"></input><br /><br />
          <label>Last Name: </label>
          <input type="text"></input><br /><br />
          <label>Username: </label>
          <input type="text"></input><br /><br />
          <label>Password: </label>
          <input type="password"></input><br /><br />
          <label>Confirm Password: </label>
          <input type="password"></input><br /><br />
          <input type="submit" onClick={this.handleSubmit}></input>
        </form>
      </div>
    )
  }
}

export default TutorSignUp

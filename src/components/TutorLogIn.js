import React from 'react'

class TutorLogIn extends React.Component {

  constructor(){
    super()

    this.state = {
      
    }
  }

  render(){
    return(
      <div>
        <h1>Tutor Login</h1>
        <form>
          <label>Username: </label>
          <input type="text"></input><br /><br />
          <label>Password: </label>
          <input type="password"></input><br /><br />
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default TutorLogIn
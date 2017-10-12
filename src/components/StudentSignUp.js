import React from 'react'
import { postStudent} from '../actions/students'
import { connect } from 'react-redux'

class StudentSignUp extends React.Component {

  constructor(){
    super()

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      locations: [],
      subjects: []
    }
  }

  getLocations = () => {
    return fetch('http://localhost:3000/api/v1/locations')
    .then((res) => res.json())
    .then((resJSON) => {
      this.setState({
        formLocations: ["", ...resJSON]
      })
    })
  }

  getSubjects = () => {
    return fetch('http://localhost:3000/api/v1/subjects')
    .then((res) => res.json())
    .then((resJSON) => {
      this.setState({
        formSubjects: ["", ...resJSON]
      })
    })
  }

  handleFirstNameChange = (event) => {
    this.setState({
      first_name: event.target.value
    })
  }

  handleLastNameChange = (event) => {
    this.setState({
      last_name: event.target.value
    })
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handlePasswordConfirmationChange = (event) => {
    this.setState({
      password_confirm: event.target.value
    })
  }

  handleLocationsChange = (event) => {
    this.setState({
      locations: event.target.value
    })
  }

  handleSubjectsChange = (event) => {
    this.setState({
      subjects: event.target.value
    })
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.checkPasswords()) {
      this.props.createStudent({
        student: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          location_id: this.state.locations
        }
      })
    } else {
      alert("Your passwords don't match")
    }
  }

  checkPasswords = () => {
    return this.state.password === this.state.password_confirm
  }


  componentDidMount() {
    this.getLocations()
    this.getSubjects()
  }

  render(){
    return(
      <div>
        <h1>Student Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input id="first_name" type="text" onChange={this.handleFirstNameChange}></input><br /><br />
          <label>Last Name: </label>
          <input id="last_name" type="text" onChange={this.handleLastNameChange}></input><br /><br />
          <label>Email: </label>
          <input id="email" type="text" onChange={this.handleEmailChange}></input><br /><br />
          <label>Username: </label>
          <input id="username" type="text" onChange={this.handleUsernameChange}></input><br /><br />
          <label>Password: </label>
          <input id="password" type="password" onChange={this.handlePasswordChange}></input><br /><br />
          <label>Confirm Password: </label>
          <input id="password_confirm" type="password" onChange={this.handlePasswordConfirmationChange}></input><br /><br />
          <label>Location: </label>
          <select onChange={this.handleLocationsChange}>
            {this.state.formLocations ? this.state.formLocations.map((location, index) => <option key={index} value={location.id}>{location.city}</option>) : null}
          </select><br /><br />
        <label>Subjects: </label>
          <select onChange={this.handleSubjectsChange}>
            {this.state.formSubjects ? this.state.formSubjects.map((subject, index) => <option key={index} value={subject.id}>{subject.name}</option>) : null}
          </select><br /><br />
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

// function mapStateToProps(state){
//   return {
//   }
// }

function mapDispatchToProps(dispatch){
  return {
    createStudent: (studentInfo) => {
      dispatch(postStudent(studentInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(StudentSignUp)

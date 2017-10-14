import React from 'react'
import { createStudent} from '../actions/students'
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
      location: "",
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
        formSubjects: [...resJSON]
      })
    })
  }

  componentDidMount() {
    this.getLocations()
    this.getSubjects()
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
      username: event.target.value.toLowerCase()
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
    // event.target.checked, event.target.value
    if (event.target.checked) {
      this.setState({
        subjects: [...this.state.subjects, event.target.value]
      }, () => console.log(this.state.subjects))
    } else {
      this.setState({
        subjects: this.state.subjects.filter((subjectId) => subjectId !== event.target.value)
      }, () => console.log(this.state.subjects))
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value.toLowerCase()
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
        },
        subjects: this.state.subjects
      })
    } else {
      alert("Your passwords don't match")
    }
  }

  checkPasswords = () => {
    return this.state.password === this.state.password_confirm
  }

  render(){
    return(
      <div>
        <h1>Student Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input id="first_name" type="text" onChange={this.handleFirstNameChange} /><br /><br />
          <label>Last Name: </label>
          <input id="last_name" type="text" onChange={this.handleLastNameChange} /><br /><br />
          <label>Email: </label>
          <input id="email" type="text" onChange={this.handleEmailChange} /><br /><br />
          <label>Username: </label>
          <input id="username" type="text" onChange={this.handleUsernameChange} /><br /><br />
          <label>Password: </label>
          <input id="password" type="password" onChange={this.handlePasswordChange} /><br /><br />
          <label>Confirm Password: </label>
          <input id="password_confirm" type="password" onChange={this.handlePasswordConfirmationChange} /><br /><br />
          <label>Location: </label>
          <select onChange={this.handleLocationsChange}>
            {this.state.formLocations ? this.state.formLocations.map((location, index) => <option key={index} value={location.id}>{location.city}</option>) : null}
          </select><br /><br />
          <label>Subjects: </label>
          <div onChange={this.handleSubjectsChange}>
            {this.state.formSubjects ? this.state.formSubjects.map((subject, index) => <label key={index}><input key={index} type='checkbox' value={subject.id} />{subject.name}<br /></label>) : null}
          </div>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}


// function mapStateToProps(state){
//   return {
        // state: "something"
//   }
// }

function mapDispatchToProps(dispatch){
  return {
    createStudent: (studentInfo) => {
      dispatch(createStudent(studentInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(StudentSignUp)

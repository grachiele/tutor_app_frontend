import React from 'react'
import { createStudent} from '../actions/students'
import { connect } from 'react-redux'
import { Button, Dropdown, Form, Grid } from 'semantic-ui-react'

class StudentSignUp extends React.Component {

  constructor(props){
    super(props)

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
      console.log(resJSON)
      this.setState({
        formLocations: resJSON.map((location) => {
          return { key: location.id, value: location.id, text: location.city }
        })
      })
    })
  }

  getSubjects = () => {
    return fetch('http://localhost:3000/api/v1/subjects')
    .then((res) => res.json())
    .then((resJSON) => {
      this.setState({
        formSubjects: resJSON.map((subject) => {
          return {key: subject.id, value: subject.id, text: subject.name }
        })
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

  handleSubjectsChange = (event, data) => {
    // event.target.checked, event.target.value
    // if (event.target.checked) {
    //   this.setState({
    //     subjects: [...this.state.subjects, event.target.value]
    //   }, () => console.log(this.state.subjects))
    // } else {
    //   this.setState({
    //     subjects: this.state.subjects.filter((subjectId) => subjectId !== event.target.value)
    //   }, () => console.log(this.state.subjects))
    // }
    console.log(data.value)
    this.setState({
      subjects: data.value
    })
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
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form>
                <Form.Input label='First Name' type="text" value={this.state.first_name} onChange={this.handleFirstNameChange} />
                <Form.Input label='Last Name' type="text" value={this.state.last_name} onChange={this.handleLastNameChange} />
                <Form.Input label='E-mail' type="text" value={this.state.email} onChange={this.handleEmailChange} />
                <Form.Input label='Username' type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                <Form.Input label='Password' type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <Form.Input label='Password Confirm' type="password" value={this.state.password_confirm} onChange={this.handleEmailChange} />
                <Form.Dropdown selection label='Locations' placeholder='Choose a Location' options={this.state.formLocations} />
                <Form.Dropdown fluid multiple selection label='Subjects'
                  placeholder='Choose your Subjects' value={this.state.subjects} options={this.state.formSubjects} onChange={this.handleSubjectsChange} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

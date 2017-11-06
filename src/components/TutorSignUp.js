import React from 'react'
import { connect } from 'react-redux'
import { createTutor } from '../actions/tutors'
import { Button, Dropdown, Form, Grid } from 'semantic-ui-react'

class TutorSignUp extends React.Component {

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
      subjects: [],
      formSubjects: [],
      formLocations: []
    }
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

    handleLocationsChange = (event, data) => {
      console.log(data.value)
      this.setState({
        locations: data.value
      })
    }

    handleSubjectsChange = (event, data) => {
      console.log(data.value)
      this.setState({
        subjects: data.value
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
        this.props.createTutor({
          tutor: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username.toLowerCase(),
            email: this.state.email.toLowerCase(),
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
        <h1>Tutor Sign Up</h1>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={10}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input label='First Name' type="text" value={this.state.first_name} onChange={this.handleFirstNameChange} />
                  <Form.Input label='Last Name' type="text" value={this.state.last_name} onChange={this.handleLastNameChange} />
                  <Form.Input label='E-mail' type="text" value={this.state.email} onChange={this.handleEmailChange} />
                  <Form.Input label='Username' type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                  <Form.Input label='Password' type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                  <Form.Input label='Password Confirm' type="password" value={this.state.password_confirm} onChange={this.handlePasswordConfirmationChange} />
                  <Form.Input label='Zipcode' onChange={this.handleLocationsChange}/>
                  <Form.Dropdown fluid multiple selection label='Subjects'
                    placeholder='Choose your Subjects' value={this.state.subjects} options={this.state.formSubjects} onChange={this.handleSubjectsChange} />
                  <Form.Button color='teal' type='submit'>Submit</Form.Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return {
    createTutor: (tutorInfo) => {
      dispatch(createTutor(tutorInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(TutorSignUp)

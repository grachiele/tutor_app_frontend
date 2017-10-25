import React from 'react'
import { logInStudent } from '../actions/students'
import { connect } from 'react-redux'
import { Button, Form, Grid } from 'semantic-ui-react'

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
    return(
      <div>
        <h1>Student Login</h1>
          <Grid centered verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={10}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input label='E-mail' type='text' value={this.state.email} onChange={this.handleEmailChange}/>
                  <Form.Input label='Password' type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                  <Button type='submit' color='teal'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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

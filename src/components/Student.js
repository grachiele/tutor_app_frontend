import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Dropdown, Grid, List } from 'semantic-ui-react'
import { removeStudentTutor, updateStudentSubject } from '../actions/students'


class Student extends React.Component {
  constructor(props) {

    console.log("MOUNTING")
    super(props)

    this.state = {
      subjects: this.props.student.subjects.map((subject) => subject.id)
    }

  }

  handleSubmit = (event) => {
    event.preventDefault()
    const subject_ids = this.state.subjects
    this.props.updateSubjects(subject_ids)
    alert("Preferences Updated!")
  }

renderOptionsForSelection() {
  return this.props.allSubjects.map((subject) => {
    return {key: subject.id, value: subject.id, text: subject.name }
  })
}

  handleButtonClick = (event) => {
    console.log(event.target.value)
    const tutorId = event.target.value
    this.props.removeAssociation(tutorId)
  }

  handleChange = (event, data) => {
    this.setState({
      subjects: data.value
    })
  }

  render() {

    if (!this.props.student) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.student){
      const tutors = this.props.student.tutors.map((tutor) => {
        const subjects = tutor.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
        return (
          <Card key={tutor.id} color='teal'>
            <Card.Content>
              <Card.Header>
                {`${tutor.first_name} ${tutor.last_name}`}
              </Card.Header>
              <Card.Meta>
                contact them at <a href={`mailto:${tutor.email}`} target="_top">{tutor.email}</a>
              </Card.Meta>
              <Card.Description>
                <List>
                  {subjects}
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button key={tutor.id} value={tutor.id} onClick={this.handleButtonClick} negative>Remove</Button>
            </Card.Content>
        </Card>
      )
    }
    )

    return (
        <div>
          <label>Tutors:</label><br />
          <Grid centered>
            <Grid.Row>
              <Card.Group>
                {tutors}
              </Card.Group>
            </Grid.Row>
          </Grid>
          <br />
          <br />
          <label>Subjects: </label>

            <form onSubmit={this.handleSubmit}>
              <Dropdown fluid multiple search selection value={this.state.subjects} options={this.renderOptionsForSelection()} onChange={this.handleChange}/><br />
              <Button color='teal' type="submit">Update</Button>
            </form>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state){
  return {
    student: state.student,
    allSubjects: state.fetches.subjects
    }
  }

function mapDispatchToProps(dispatch){
  return {
    removeAssociation: (tutorId) => {
      dispatch(removeStudentTutor(tutorId))
    },
    updateSubjects: (subjectIds) => {
      dispatch(updateStudentSubject(subjectIds))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Student)

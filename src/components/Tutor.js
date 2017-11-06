import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Dropdown, Form, Grid, List } from 'semantic-ui-react'
import { removeTutorStudent, updateTutorSubject } from '../actions/tutors'

class Tutor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subjects: this.props.tutor.subjects.map((subject) => subject.id)
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
    console.log(event.target)
    const studentId = event.target.value
    this.props.removeAssociation(studentId)
  }

  handleChange = (event, data) => {
    this.setState({
      subjects: data.value
    })
  }

  render() {

    if (!this.props.tutor) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.tutor){
      const students = this.props.tutor.students.map((student) => {
        const zipcode =`https://www.google.com/maps/embed/v1/place?key=AIzaSyCNUIlhwaQ4xLbNM5Qs2of7wx7pcw8yjaM&q=${student.location.zipcode}`
        const subjects = student.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
        return (
          <Card key={student.id} color='teal'>
            <Card.Content>
              <Card.Header>
                {`${student.first_name} ${student.last_name}`}
              </Card.Header>
              <Card.Meta>
                {`from ${student.location.city}, ${student.location.state}`}<br />
                contact them at <a href={`mailto:${student.email}`} target="_top">{student.email}</a>
              </Card.Meta>
              <Card.Description>
                <List>
                  {subjects}
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <iframe title="map" width="250" height="200" src={zipcode}></iframe><br />
              <Button key={student.id} value={student.id} onClick={this.handleButtonClick} negative>Remove</Button>
            </Card.Content>
        </Card>
      )
    }
    )
    return (
          <div>
            <h3>Students:</h3><br />
            <Grid centered>
              <Grid.Row>
                <Card.Group>
                  {students}
                </Card.Group>
              </Grid.Row>
            </Grid>
            <br />
            <br />
            <h3>Update Subjects</h3>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Dropdown label="Subjects" fluid multiple selection value={this.state.subjects} options={this.renderOptionsForSelection()} onChange={this.handleChange} /><br />
                    <Button color='teal' type="submit">Update</Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state){
  return {
    tutor: state.tutor,
    allSubjects: state.fetches.subjects,
    }
  }

  function mapDispatchToProps(dispatch){
    return {
      removeAssociation: (studentId) => {
        dispatch(removeTutorStudent(studentId))
      },
      updateSubjects: (subjectIds) => {
        dispatch(updateTutorSubject(subjectIds))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Tutor)

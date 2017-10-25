import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, List } from 'semantic-ui-react'
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
  }

  handleCheckboxClick = (event) => {
    if (event.target.checked && !this.state.subjects.includes(event.target.value)){
      this.setState({
        subjects: [...this.state.subjects, parseInt(event.target.value)]
      })
    } else {
      this.setState({
        subjects: this.state.subjects.filter((subject) => parseInt(event.target.value) !== subject)
      })
    }
  }

  handleButtonClick = (event) => {
    console.log(event.target)
    const studentId = event.target.value
    this.props.removeAssociation(studentId)
  }

  renderCheckBoxes() {
    const tutor_subjects = this.props.tutor.subjects.map((subject) => subject.name)
    console.log(tutor_subjects)
    if (this.props.allSubjects) {
      console.log(this.props.allSubjects)
      return (
        this.props.allSubjects.map((subject) => {
          if (tutor_subjects.includes(subject.name)){
            return (<label key={subject.id}><input key={subject.id} defaultChecked={true} type='checkbox' value={subject.id} onChange={this.handleCheckboxClick}/>{subject.name}<br /></label>)
        } else {
          return (<label key={subject.id}><input key={subject.id} defaultChecked={false} type='checkbox' value={subject.id} onChange={this.handleCheckboxClick}/>{subject.name}<br /></label>)
        }
        })
      )
    }
    return null
  }

  render() {

    if (!this.props.tutor) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.tutor){
      const students = this.props.tutor.students.map((student) => {
        const subjects = student.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
        return (
          <Card key={student.id}>
            <Card.Content>
              <Card.Header>
                {`${student.first_name} ${student.last_name}`}
              </Card.Header>
              <Card.Meta>
                contact them at <a href={`mailto:${student.email}`} target="_top">{student.email}</a>
              </Card.Meta>
              <Card.Description>
                <List>
                  {subjects}
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button key={student.id} value={student.id} onClick={this.handleButtonClick} negative>Remove</Button>
            </Card.Content>
        </Card>
      )
    }
    )
    return (
          <div>
            <div>
              <label>Students:</label><br />
              <Card.Group>
                {students}
              </Card.Group>
            </div>
          <form onSubmit={this.handleSubmit}>
            <label>Subjects: </label>
            <div onChange={this.handleSubjectsChange}>
              {this.renderCheckBoxes()}
            </div>
            <button type="submit">Update</button>
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

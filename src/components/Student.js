import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, List } from 'semantic-ui-react'
import { removeStudentTutor, updateStudentSubject } from '../actions/students'


class Student extends React.Component {
  constructor(props) {

    console.log("MOUNTING")
    super(props)

    this.state = {
      subjects: this.props.student.subjects.map((subject) => subject.id)
    }

    console.log(this.state, this.props.student)
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
    console.log(event.target.value)
    const tutorId = event.target.value
    this.props.removeAssociation(tutorId)
  }

  renderCheckBoxes() {
    const student_subjects = this.props.student.subjects.map((subject) => subject.name)
    console.log(student_subjects)
    if (this.props.allSubjects) {
      console.log(this.props.allSubjects)
      return (
        this.props.allSubjects.map((subject) => {
          if (student_subjects.includes(subject.name)){
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

    if (!this.props.student) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.student){
      const tutors = this.props.student.tutors.map((tutor) => {
        const subjects = tutor.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
        return (
          <Card key={tutor.id}>
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
            <div>
              <label>Tutors:</label><br />
              <Card.Group>
                {tutors}
              </Card.Group>
            </div>
          <form onSubmit={this.handleSubmit}>
            <label>Subjects: </label>
            <div>
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

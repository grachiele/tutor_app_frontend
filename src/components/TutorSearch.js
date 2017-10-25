import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Dropdown, Grid, Image, Input, List } from 'semantic-ui-react'
import { createTutorStudent } from '../actions/tutors'
import { storeSubjectName } from '../actions/subjectNames'

class TutorSearch extends React.Component {

  constructor(props) {
    super(props)
  }

  handleDropDownClick = (event, data) => {
    console.log("DATA", data)
    this.props.newSubjectName(data.value.toLowerCase())
  }

  handleButtonClick = (event) => {
    console.log(event.target.value)
    const studentId = event.target.value
    this.props.createTutorStudent(studentId)
  }

  render(){
    if (this.props.fetching && !this.props.tutor && !this.props.students) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.students && this.props.tutor){
      const loaded = this.props.tutor.not_selected_students.map((student) => {
        const subjects = student.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
          if (student.subject_names.includes(this.props.subjectName)){
            return (
              <Card key={student.id} color='teal' raised>
              <Card.Content>
                <Card.Header>
                  {`${student.first_name} ${student.last_name}`}
                </Card.Header>
                <Card.Meta>
                  is looking for tutoring in:
                </Card.Meta>
                <Card.Description>
                  <List>
                    {subjects}
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                  <Button value={student.id} onClick={this.handleButtonClick} positive>Add</Button>
              </Card.Content>
            </Card>
            )
          }
        })
        const dropDownOptions = this.props.subjects.map((subject) => {
          return {key: subject.id, value: subject.name, text: subject.name}
        });
      return (
        <Grid verticalAlign='middle' centered>
          <h1>Search Students by Subject</h1>
          <Grid.Row>
            <Dropdown onChange={this.handleDropDownClick} placeholder={'Select a Subject'} selection options={dropDownOptions}/>
          </Grid.Row>
          <br />
          <Grid.Row>
              <Card.Group stackable={true}>
                {loaded}
              </Card.Group>
          </Grid.Row>
        </Grid>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state){
  return {
    tutor: state.tutor,
    subjects: state.fetches.subjects,
    students: state.fetches.students,
    fetching: state.fetches.isFetching,
    subjectName: state.subjectName.subjectName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createTutorStudent: (studentId) => {
      dispatch(createTutorStudent(studentId))
    },
    newSubjectName: (subjectName) => {
      dispatch(storeSubjectName(subjectName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorSearch)

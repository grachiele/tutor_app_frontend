import React from 'react'
import { connect } from 'react-redux'
import { Grid, List, Button, Card, Image, Input, Dropdown } from 'semantic-ui-react'
import { createStudentTutor } from '../actions/students'
import { storeSubjectName } from '../actions/subjectNames'

class StudentSearch extends React.Component {
  constructor(props) {
    console.log("Mounting")
    super(props)

  }

  handleDropDownClick = (event, data) => {
    console.log("DATA", data)
    this.props.newSubjectName(data.value.toLowerCase())
  }

  handleButtonClick = (event) => {
    console.log(event.target.value)
    const tutorId = event.target.value
    this.props.createStudentTutor(tutorId)

  }

  render(){
    if (this.props.fetching && !this.props.tutors && !this.props.student) {
      return (
        <div className="ui active loader"></div>
      )
    } else if (this.props.tutors && this.props.student){
      const loaded = this.props.student.not_selected_tutors.map((tutor) => {
        console.log("TUTOR", tutor)
        const zipcode = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNUIlhwaQ4xLbNM5Qs2of7wx7pcw8yjaM&q=${tutor.location.zipcode}`
        const subjects = tutor.subjects.map((subject) => <List.Item key={subject.id}>{subject.name}</List.Item>)
          if (tutor.subject_names.includes(this.props.subjectName) && this.props.student.tutors.includes(tutor) === false){
            return (
              <Card key={tutor.id}>
              <Card.Content>
                <Card.Header>
                  {`${tutor.first_name} ${tutor.last_name}`}
                </Card.Header>
                <Card.Meta>
                  {`from ${tutor.location.city}, ${tutor.location.state}`}<br />
                  is looking to tutor in:
                </Card.Meta>
                <Card.Description>
                  <List>
                    {subjects}
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <iframe title="map" width="250" height="200" src={zipcode}></iframe><br />
                <Button value={tutor.id} onClick={this.handleButtonClick} positive>Add</Button>
              </Card.Content>
            </Card>
            )
          }
        })
      const dropDownOptions = this.props.subjects.map((subject) => {
        return {key: subject.id, value: subject.name, text: subject.name}
      });

      return (
        <div>
          <h1>Search Tutors by Subject</h1>
          <div>
            <Dropdown onChange={this.handleDropDownClick} placeholder='Select a Subject' selection options={dropDownOptions}/>
          </div>
          <br />
          <Grid centered>
              <Card.Group>
                {loaded}
              </Card.Group>
          </Grid>
        </div>
      )
    } else {
      return null
    }
  }
  }

function mapStateToProps(state) {
  return {
    student: state.student,
    tutor: state.tutor,
    subjects: state.fetches.subjects,
    tutors: state.fetches.tutors,
    fetching: state.fetches.isFetching,
    subjectName: state.subjectName.subjectName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createStudentTutor: (tutorId) => {
      dispatch(createStudentTutor(tutorId))
    },
    newSubjectName: (subjectName) => {
      dispatch(storeSubjectName(subjectName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSearch)

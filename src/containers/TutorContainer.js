import React from 'react'
import Tutor from '../components/Tutor'

class TutorContainer extends React.Component {

  constructor(){
    super()

    this.state = {
      tutors: []
    }
  }

  render() {
    return(
      <div>
        <h1>Preferences</h1>
        <Tutor />
      </div>
    )
  }
}

export default TutorContainer

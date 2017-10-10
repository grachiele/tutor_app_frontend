import React from 'react'
import Student from '../components/Student'

class StudentContainer extends React.Component {

  constructor(){
    super()

    this.state = {
      
    }
  }

  render() {
    return(
      <div>
        <h1>StudentContainer</h1>
        <Student />
      </div>
    )
  }
}

export default StudentContainer

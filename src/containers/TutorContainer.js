import React from 'react'
import Tutor from '../components/Tutor'

class TutorContainer extends React.Component {

  constructor(){
    super()

    this.state = {
      tutors: []
    }
  }

  // componentWillMount(){
  //   fetch('http://localhost:3000/api/v1/tutors')
  //   .then((res) => res.json())
  //   .then((json) => this.setState({
  //     tutors: [...json]
  //   })
  //   )
  // }

  render() {
    // console.log(this.state)
    return(
      <div>
        <h1>Preferences</h1>
        <Tutor />
      </div>
    )
  }
}

export default TutorContainer

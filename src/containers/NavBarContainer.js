import React from 'react'
import NavBar from '../components/NavBar'

class NavBarContainer extends React.Component {

  constructor(){
    super()
  }

  render() {
    return(
      <div>
        <h1>NavBarContainer</h1>
        <NavBar />
      </div>
    )
  }
}

export default NavBarContainer

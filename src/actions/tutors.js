export function createATutor(TutorInfo){
  return {
    type: "CREATE_TUTOR",
    payload: TutorInfo
  }
}

export function logInATutor(TutorInfo){
  return {
    type: "LOG_IN_TUTOR",
    payload: TutorInfo
  }
}


export function createTutor(newTutorInfo) {
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/tutors', {
      method: 'post',
      body: JSON.stringify(newTutorInfo),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      if (resjson.jwt_token) {
        localStorage.setItem("tutor_jwt_token", resjson.jwt_token)
      }
    })
  }
}

export function logInTutor(tutorInfo) {
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/tutor_sessions', {
      method: 'post',
      body: JSON.stringify(tutorInfo),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, console.log(JSON.stringify(tutorInfo)))
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      if (resjson.jwt_token) {
        localStorage.setItem("tutor_jwt_token", resjson.jwt_token)
      }
    })
  }
}

function createATutor(TutorInfo){
  return {
    type: "CREATE_TUTOR",
    payload: TutorInfo
  }
}

function logInATutor(TutorInfo){
  return {
    type: "LOG_IN_TUTOR",
    payload: TutorInfo
  }
}

function fetchTutorInfo(TutorInfo) {
  return {
    type: "FETCH_TUTOR_INFO",
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
      if (resjson.jwt_token) {
        localStorage.setItem("tutor_jwt_token", resjson.jwt_token)
      }
      dispatch(createATutor(resjson.tutor))
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
      if (resjson.jwt_token) {
        localStorage.setItem("tutor_jwt_token", resjson.jwt_token)
      }
      console.log("TUTOR RESJSON", resjson)
      dispatch(logInATutor(resjson.tutor))
    })
  }
}

export function retrieveTutorInfo(jwt_token){
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/tutor_information', {
      method: 'get',
      headers: {
        "Authorization": "Bearer " + jwt_token
      }
    })
    .then((res) => res.json())
    .then((resjson) => {
      console.log("RESJSON", resjson)
      return dispatch(fetchTutorInfo(resjson))
    })
  }
}

export function createTutorStudent(studentId) {
  const jwt_token = localStorage.getItem('tutor_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/tutor_student', {
      method: 'post',
      body: JSON.stringify({student_id: studentId}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt_token
      }
    }, console.log(JSON.stringify({student_id: studentId})))
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      dispatch(retrieveTutorInfo(jwt_token))
    })
  }
}

export function removeTutorStudent(studentId) {
  const jwt_token = localStorage.getItem('tutor_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/remove_association_tutor', {
      method: 'post',
      body: JSON.stringify({student_id: studentId}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt_token
      }
    }, console.log(JSON.stringify({student_id: studentId})))
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      dispatch(retrieveTutorInfo(jwt_token))
    })
  }
}

export function updateTutorSubject(subjectIds) {
  const jwt_token = localStorage.getItem('tutor_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/tutor_subject', {
      method: 'post',
      body: JSON.stringify({subject_ids: subjectIds}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt_token
      }
    }, console.log(JSON.stringify({subject_ids: subjectIds})))
    .then((res) => res.json())
    .then((resjson) => {
      console.log("RESJSON",resjson)
      dispatch(retrieveTutorInfo(jwt_token))
    })
  }
}

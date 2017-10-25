function createAStudent(StudentInfo){
  return {
    type: "CREATE_STUDENT",
    payload: StudentInfo
  }
}

function logInAStudent(StudentInfo){
  return {
    type: "LOG_IN_STUDENT",
    payload: StudentInfo
  }
}

function fetchStudentInfo(StudentInfo) {
  return {
    type: "FETCH_STUDENT_INFO",
    payload: StudentInfo
  }
}


export function createStudent(newStudentInfo) {
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/students', {
      method: 'post',
      body: JSON.stringify(newStudentInfo),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      if (resjson.jwt_token) {
        localStorage.setItem("student_jwt_token", resjson.jwt_token)
      }
      dispatch(createAStudent(resjson.student))
  })
  }
}

export function logInStudent(studentInfo) {
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/student_sessions', {
      method: 'post',
      body: JSON.stringify(studentInfo),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, console.log(JSON.stringify(studentInfo)))
    .then((res) => res.json())
    .then((resjson) => {
      if (resjson.jwt_token) {
        localStorage.setItem("student_jwt_token", resjson.jwt_token)
      }
      dispatch(logInAStudent(resjson.student))

    })
  }
}

export function retrieveStudentInfo(jwt_token){
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/student_information', {
      method: 'get',
      headers: {
        "Authorization": "Bearer " + jwt_token
      }
    })
    .then((res) => res.json())
    .then((resjson) => dispatch(fetchStudentInfo(resjson)))
  }
}

export function createStudentTutor(tutorId) {
  const jwt_token = localStorage.getItem('student_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/student_tutor', {
      method: 'post',
      body: JSON.stringify({tutor_id: tutorId}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt_token
      }
    }, console.log(JSON.stringify({tutor_id: tutorId})))
    .then((res) => res.json())
    .then((resjson) => {
      console.log(resjson)
      dispatch(fetchStudentInfo(resjson))
    })
  }
}

export function removeStudentTutor(tutorId) {
  const jwt_token = localStorage.getItem('student_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/remove_association_student', {
      method: 'post',
      body: JSON.stringify({tutor_id: tutorId}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt_token
      }
    }, console.log(JSON.stringify({tutor_id: tutorId})))
    .then((res) => res.json())
    .then((resjson) => {
      dispatch(fetchStudentInfo(resjson))
    })
  }
}

export function updateStudentSubject(subjectIds) {
  const jwt_token = localStorage.getItem('student_jwt_token')
  return function(dispatch) {
    fetch('http://localhost:3000/api/v1/student_subject', {
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
      console.log("RESJSON", resjson)
      dispatch(fetchStudentInfo(resjson))
    })
  }
}

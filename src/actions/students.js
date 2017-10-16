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
      dispatch(createAStudent(resjson.student))
      localStorage.setItem("student_jwt_token", resjson.jwt_token)
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
      console.log(resjson)
      dispatch(logInAStudent(resjson.student))
      localStorage.setItem("student_jwt_token", resjson.jwt_token)
    })
  }
}

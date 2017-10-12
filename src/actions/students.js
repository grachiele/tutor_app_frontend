export function addStudent(StudentInfo){
  return {
    type: "ADD_STUDENT",
    payload: StudentInfo
  }
}


export function postStudent(newStudentInfo) {
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
    .then((resjson) => console.log(resjson))
  }
}

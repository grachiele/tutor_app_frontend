export function addTutor(TutorInfo){
  return {
    type: "ADD_TUTOR",
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
    .then((resjson) => console.log(resjson))
  }
}

function fetching() {
  return {
    type: "FETCHING",
    isFetching: true
  }
}

function fetchedSubjects(allSubjects) {
  return {
    type: "FETCHED_SUBJECTS",
    payload: allSubjects,
    isFetching: false
  }
}

function fetchedTutors(allTutors) {
  return {
    type: "FETCHED_TUTORS",
    payload: allTutors,
    isFetching: false
  }
}

function fetchedStudents(allStudents) {
  return {
    type: "FETCHED_STUDENTS",
    payload: allStudents,
    isFetching: false
  }
}


export function subjectFetcher() {
  return function getSubjects(dispatch){
    dispatch(fetching())
    return fetch('http://localhost:3000/api/v1/subjects')
    .then((res) => res.json())
    .then((resJSON) => dispatch(fetchedSubjects(resJSON)))
  }
}

export function tutorsFetcher() {
  return function getTutors(dispatch){
    dispatch(fetching())
    return fetch('http://localhost:3000/api/v1/tutors')
    .then((res) => res.json())
    .then((resJSON) => dispatch(fetchedTutors(resJSON)))
  }
}

export function studentsFetcher() {
  return function getTutors(dispatch){
    dispatch(fetching())
    return fetch('http://localhost:3000/api/v1/students')
    .then((res) => res.json())
    .then((resJSON) => {
      console.log(resJSON)
      return dispatch(fetchedStudents(resJSON))
    })
  }
}

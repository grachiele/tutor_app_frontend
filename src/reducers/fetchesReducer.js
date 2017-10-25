function fetchesReducer( state = { tutors: [], subjects: [], locations: [], isFetching: false }, action) {
  switch (action.type){
    case "FETCHING":
      return Object.assign({}, state, {...state, isFetching: action.isFetching})
    case "FETCHED_SUBJECTS":
      return Object.assign({}, state, {...state, subjects: [...action.payload], isFetching: false})
    case "FETCHED_TUTORS":
      return Object.assign({}, state, {...state, tutors: [...action.payload], isFetching: false})
    case "FETCHED_STUDENTS":
      return Object.assign({}, state, {...state, students: [...action.payload], isFetching: false})
    default:
      return state
  }
}

export default fetchesReducer

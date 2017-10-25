function studentsReducer(state =  { first_name: "", last_name: "", username: "", email: "", location: {}, tutors: [], not_selected_tutors: [], subjects: [] } , action) {
  switch (action.type) {
    case "LOG_IN_STUDENT":
      return  {...action.payload}
    case "CREATE_STUDENT":
      return {...action.payload}
    case "FETCH_STUDENT_INFO":
      return Object.assign({}, state, {...action.payload})
    default:
      return state
  }
}

export default studentsReducer

function studentsReducer(state = { student: { first_name: "", last_name: "", username: "", email: "", password: "", locations: [], subjects: [] } }, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return Object.assign({}, state, {student: {...action.payload}})
    case "CREATE_STUDENT":
      return Object.assign({}, state, {student: {...action.payload}})
    default:
      return state
  }
}

export default studentsReducer

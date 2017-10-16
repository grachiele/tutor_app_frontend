function studentsReducer(state = { student: { first_name: "", last_name: "", username: "", email: "", location: {}, subjects: [] } }, action) {
  switch (action.type) {
    case "LOG_IN_STUDENT":
      return Object.assign({}, state, {student: {...action.payload}})
    case "CREATE_STUDENT":
      return Object.assign({}, state, {student: {...action.payload}})
    default:
      return state
  }
}

export default studentsReducer

function studentsReducer(state =  { first_name: "", last_name: "", username: "", email: "", location: {}, subjects: [] } , action) {
  switch (action.type) {
    case "LOG_IN_STUDENT":
      return  {...action.payload}
    case "CREATE_STUDENT":
      return {...action.payload}
    default:
      return state
  }
}

export default studentsReducer

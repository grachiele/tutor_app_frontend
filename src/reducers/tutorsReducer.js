function tutorsReducer(state={ first_name: "", last_name: "", username: "", email: "", locations: {}, students: [], subjects: [], not_selected_students: [], all_subjects: [] }, action) {
  switch (action.type) {
    case "LOG_IN_TUTOR":
      return {...action.payload}
    case "CREATE_TUTOR":
      return {...action.payload}
    case "FETCH_TUTOR_INFO":
      return {...action.payload}
    default:
      return state
  }
}

export default tutorsReducer

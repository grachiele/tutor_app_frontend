function tutorsReducer(state={ tutor: {first_name: "", last_name: "", username: "", email: "", authentication_token: "", locations: {}, subjects: [] } }, action) {
  switch (action.type) {
    case "CREATE_TUTOR":
      return Object.assign({}, state, {tutor: {...action.payload}})
    case "LOG_IN_TUTOR":
      return Object.assign({}, state, {tutor: {...action.payload}})
    default:
      return state
  }
}

export default tutorsReducer

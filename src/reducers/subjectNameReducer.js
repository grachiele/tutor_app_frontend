function subjectNameReducer(state={ subjectName: "" }, action) {
  switch (action.type) {
    case "SUBJECT_NAME":
      return Object.assign({}, state, {subjectName: action.payload})
    default:
      return state
  }
}

export default subjectNameReducer

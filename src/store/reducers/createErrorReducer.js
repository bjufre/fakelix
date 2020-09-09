export default ([requestAction, successAction, failureAction]) => {
  return function errorMessage(state = null, action) {
    switch (action.type) {
      case requestAction:
      case successAction:
        return null;
      case failureAction:
        return action.message;
      default:
        return state;
    }
  }
}

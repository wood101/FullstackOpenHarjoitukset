const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content
  default:
    return state
  }
}

export const notificationCreation = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content
  }
}

export default notificationReducer
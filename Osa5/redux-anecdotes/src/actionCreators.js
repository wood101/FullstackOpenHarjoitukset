const generateId = () => Number((100000*Math.random()).toFixed(0))

export default {
  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    }
  },
  voting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}
import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  voteAnecdote = (id) => (e) => {
    this.props.store.dispatch(
      actionFor.voting(id)
    )
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(function(a, b) {
          return b.votes - a.votes
        }).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App
/* global voteAnecdote, showAnecdote */
import React from 'react'
import { notificationCreation } from './../reducers/notificationReducer'
import { voting } from './../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {

  // eslint-disable-next-line no-unused-vars
  voteAnecdote = (anecdote) => (e) => {
    this.props.store.dispatch(
      voting(anecdote.id)
    )
    this.props.store.dispatch(
      notificationCreation('Voted for anecdote: "' + anecdote.content + '"')
    )
    setTimeout(() => {
      this.props.store.dispatch(
        notificationCreation('')
      )
    }, 5000)
  }

  showAnecdote = (anecdote) => {
    const filter = this.props.store.getState().filter
    if(anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={this.voteAnecdote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          this.showAnecdote(anecdote)
        )}
      </div>
    )
  }
}

export default AnecdoteList

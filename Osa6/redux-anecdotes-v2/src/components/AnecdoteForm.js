/* global addAnecdote */
import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  
  addAnecdote = (e) => {
    e.preventDefault()
    this.props.store.dispatch(
      anecdoteCreation(e.target.anecdote.value)
    )
    this.props.store.dispatch(
      notificationCreation('Created new anecdote: ' + e.target.anecdote.value)
    )
    setTimeout(() => {
      this.props.store.dispatch(
        notificationCreation('')
      )
    }, 5000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm

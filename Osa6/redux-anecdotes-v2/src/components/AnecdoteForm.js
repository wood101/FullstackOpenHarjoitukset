/* global addAnecdote */
import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  
  addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    
    this.props.notificationCreation('Created new anecdote: ' + e.target.anecdote.value)
    setTimeout(() => {
      this.props.notificationCreation('')
    }, 5000)
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


const mapDispatchToProps = {
  anecdoteCreation,
  notificationCreation
}

const ConnectedNoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedNoteForm

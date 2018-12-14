/* global voteAnecdote, showAnecdote */
import React from 'react'
import { notificationCreation } from './../reducers/notificationReducer'
import { voting } from './../reducers/anecdoteReducer'
import anecdoteService from './../services/anecdotes'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  // eslint-disable-next-line no-unused-vars
  voteAnecdote = (anecdote) => async (e) => {
    anecdote.votes = anecdote.votes + 1
    await anecdoteService.update(anecdote, anecdote.id)
    
    this.props.voting(anecdote.id)
    this.props.notificationCreation('Voted for anecdote: "' + anecdote.content + '"')
    setTimeout(() => {
      this.props.notificationCreation('')
    }, 5000)
  }

  showAnecdote = (anecdote) => {
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

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          this.showAnecdote(anecdote)
        )}
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voting,
  notificationCreation
}

const ConnectedNoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedNoteList

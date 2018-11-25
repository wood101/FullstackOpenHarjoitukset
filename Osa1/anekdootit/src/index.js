import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

    getRndAnecdote(min, max) {
        let selection = Math.floor(Math.random() * (max - min) ) + min;
        while(selection === this.state.selected) selection = Math.floor(Math.random() * (max - min) ) + min;
        return selection
    }

    addVotes(arvo) {
        const newVotes = this.state.votes
        newVotes[arvo] = newVotes[arvo] + 1
        this.setState({votes: newVotes})
    }  

    mostVotes() {
        let max = 0
        let index = 0
        for(let i = 0; i < this.state.votes.length; i++) {
            if(this.state.votes[i] > max){
                max = this.state.votes[i]  
                index = i
            }
        }
        return index
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.anecdotes[this.state.selected]}
                    <p>has {this.state.votes[this.state.selected]} votes</p>
                </div>
                <div>
                    <button onClick= {() => this.addVotes(this.state.selected)}>vote</button>
                    <button onClick= {() => this.setState({selected: this.getRndAnecdote(0, anecdotes.length - 1)})}>next anecdote</button>
                </div>
                <div>
                    <h1>anecdote with the most votes:</h1>
                    {this.props.anecdotes[this.mostVotes()]}
                    <p>has {this.state.votes[this.mostVotes()]} votes</p>
                </div>
            </div>
        )
    }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)

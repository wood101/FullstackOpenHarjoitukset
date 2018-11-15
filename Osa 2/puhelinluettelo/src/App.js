import React from 'react';
import Filter from './components/Filter'
import Form from './components/Form'
import server from './components/Server'
import Notification from './components/Notification'
import './index.css'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filter: '',
      gotJson: false,         
      error: null,
      success: null
    }
  }

  componentDidMount() {
    server.getAll().then(persons => {
        this.setState({persons})
        this.setState({gotJson: true})
      })
  }

  updateFilter = (filter) => {
    this.setState({filter})
  }

  updatePerson = (persons, success, error) => {
    this.setState({persons})
    this.setState({success})
    this.setState({error})
  }

  handleClickRemoveButton = (person) => {
    if (window.confirm("Poistetaanko "+ person.name +"?")) { 
      const i = this.state.persons.map(e => e.id).indexOf(person.id);
      server.remove(person.id)
      var array = this.state.persons
      array.splice(i, 1)
      this.setState({persons: array})
  }
  }

  showNumber = (person) => {
    if(person.name.toLowerCase() !== this.state.filter.toLowerCase()) {
      return (
      <div key={person.name}>
        <p>{person.name} {person.number}  <button onClick={() => this.handleClickRemoveButton(person)}>poista</button> </p>
      </div>
         )
    }
  }

  render() {
    if(!this.state.gotJson) return null
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification errorMessage={this.state.error} successMessage={this.state.success}/>
        <Filter filter = {this.updateFilter} />
        <h2>Lisää uusi tai muuta olemassa olevan henkilön numeroa</h2>
        <Form newSubmission = {this.updatePerson} persons = {this.state.persons} />
        <h2>Numerot</h2>
        <div>
        {this.state.persons.map(person => this.showNumber(person))}
        </div>
        
      </div>
    )
  }
}

export default App

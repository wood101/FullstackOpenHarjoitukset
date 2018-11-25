import React, {Component} from 'react';
import server from './Server'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
          newName: '',
          newNumber: '',
          error: '',
          success: ''
        }
      }

    render() {
        return(
            <form onSubmit={this.addPerson}>
                <div>
                    nimi: <input value={this.state.newName}
                    onChange={this.handleNameChange} />
                </div>
                <div>
                    numero: <input value={this.state.newNumber}
                    onChange={this.handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        )    
    }

    handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
    }
    
    handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
    }

    addPerson = (event) => {
        event.preventDefault()
        for(var i = 0; i < this.props.persons.length; i++) {
            if(this.props.persons[i].name === this.state.newName) {
                const person = this.props.persons[i]
                if(window.confirm(person.name + " on jo luettelossa, korvataanko vanha numero uudella?")) {
                    this.updatePerson(person)
                }
                return
            }
        }

        const person = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        
        server.create(person).then(response => {
            this.setState({
                newName: '',
                newNumber: ''
            })
            const persons = this.props.persons.concat(response)
            this.props.newSubmission(persons, 'Lisättiin ' + person.name + '.', null)
        })

    }
    
    updatePerson = (person) => {
        person.number = this.state.newNumber

        server.update(person, person.id).then(response => {
            this.setState({
                newName: '',
                newNumber: ''
            })
            server.getAll().then(array => {
                this.props.newSubmission(array, 'Henkilön ' + person.name + ' numero vaihdettiin onnistuneesti.', null)
            })
        }).catch(error => {
            const i = this.props.persons.map(e => e.id).indexOf(person.id);
            var array = this.props.persons
            array.splice(i, 1)
            this.props.newSubmission(array, null , 'Henkilön ' + person.name + ' tiedot on jo poistettu.')
        })
    }
}
export default Form
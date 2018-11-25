import React from 'react';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  changeFilter = (country) => {
    this.setState({filter: country})
  }

  showCountries = () => {
    const filtered = this.state.countries.filter(
      country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
      
      if(filtered.length >= 10) return (<p>too many matches, be more specific</p>)
      if(filtered.length === 1) return this.showSingleCountry(filtered[0])

      return(
      filtered.map(country => <p key={country.name} onClick={() => this.changeFilter(country.name)}>{country.name}</p>)
      )
  }

  showSingleCountry = (country) => {
    return(
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} alt="Flag" />

      </div>
    )
  }

  render() {
    return (
      <div>
        find countries: <input onChange={this.handleFilterChange} />
        <div>
          {this.showCountries()}
        </div>
        
      </div>
    )
  }
}

export default App

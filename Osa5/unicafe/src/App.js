import React from 'react';
import Statistiikka from './components/Statistiikka'
import Palaute from './components/Palaute'

class App extends React.Component {
  
  klik = (nappi) => () => {
    this.props.store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <Palaute klik={this.klik}/>
        <Statistiikka store={this.props.store} klik={this.klik}/>
      </div>
    )
  }
}

export default App;

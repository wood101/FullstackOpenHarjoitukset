import React from 'react';

class Palaute extends React.Component {
    render() {
        return (
          <div>
            <h2>anna palautetta</h2>
            <button onClick={this.props.klik('GOOD')}>hyvä</button>
            <button onClick={this.props.klik('OK')}>neutraali</button>
            <button onClick={this.props.klik('BAD')}>huono</button>
          </div>
        )
    }
}

export default Palaute
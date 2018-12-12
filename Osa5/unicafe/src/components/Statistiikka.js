import React from 'react';

class Statistiikka extends React.Component {
    
    keskiarvo() {
        return ((this.props.store.getState().good - this.props.store.getState().bad)/3).toFixed(2)
    }

    positiivisia() {
        return (this.props.store.getState().good/(this.props.store.getState().good + this.props.store.getState().bad + this.props.store.getState().ok) * 100).toFixed(1)
    }

    Statistic(arvo, numero, paate) {
        return (
        <tr>
            <td>{arvo}</td>
            <td>{numero}{paate}</td>
        </tr>
        )
    }

    render() {
        if (this.props.store.getState().good === 0 && this.props.store.getState().ok === 0 && this.props.store.getState().bad === 0) {
            return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
            )
        }
        return (
            <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                <tr>
                    <td>hyvä {this.props.store.getState().good}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>neutraali {this.props.store.getState().ok}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>huono {this.props.store.getState().bad}</td>
                    <td></td>
                </tr>
                {this.Statistic('keskiarvo', this.keskiarvo(), "")}
                {this.Statistic('positiivisia', this.positiivisia(), "%")}
                </tbody>
            </table>
        
            <button onClick={this.props.klik('ZERO')}>nollaa tilasto</button>
            </div >
        )
    }
}

export default Statistiikka
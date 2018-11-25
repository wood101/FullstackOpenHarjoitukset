import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0
        }    
    }   

    kasvataArvoaYhdella(arvo) {
        this.setState({[arvo]: this.state[arvo] + 1})
    }

    keskiarvo() {
        return ((this.state.hyvä - this.state.huono)/3).toFixed(2)
    }

    positiivisia() {
        return (this.state.hyvä/(this.state.hyvä + this.state.huono + this.state.neutraali) * 100).toFixed(1)
    }

    button(arvo) {
        return (
        <button onClick= {() => this.kasvataArvoaYhdella(arvo)}>{arvo}</button>  
        ) 
    }

    Statistics() {
        return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{this.state.hyvä} </td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{this.state.neutraali} </td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{this.state.huono}</td>
                    </tr>
                        {this.Statistic('keskiarvo', this.keskiarvo(), "")}
                        {this.Statistic('positiivisia', this.positiivisia(), "%")}
                </tbody>
            </table>
        </div>
        )
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
        return (
            <div>
            <div>
                <h1>anna palautetta</h1>
                {this.button('hyvä')}
                {this.button('neutraali')}
                {this.button('huono')}
            </div>
            {(this.state.hyvä > 0 | this.state.neutraali > 0 | this.state.hyvä) > 0 && this.Statistics()}
            </div>
        )
    }
}

  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

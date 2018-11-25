import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }    

    const Kurssi = () => {
        return (
            <h1>{kurssi.nimi}</h1>
        )
    }

    const Sisalto = () => {
        return (
            <div>
            <Osa1 />
            <Osa2 />
            <Osa3 />
            </div>
        )
    }

    const Osa1 = () => {
        return (
            <p>{kurssi.osat[0].nimi} {kurssi.osat[0].tehtavia}</p>
        )
    }  

    const Osa2 = () => {
        return (
            <p>{kurssi.osat[1].nimi} {kurssi.osat[1].tehtavia}</p>
        )
    }  

    const Osa3 = () => {
        return (
            <p>{kurssi.osat[2].nimi} {kurssi.osat[2].tehtavia}</p>
        )
    }   
    
    const Yhteensa = () => {
        return (
            <p>yhteensä {kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} tehtävää</p>
        )
    }

  return (
    <div>
      <Kurssi kurssi={kurssi}/>
      <Sisalto kurssi={kurssi}/>
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

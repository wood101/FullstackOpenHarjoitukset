import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ kurssit }) => {
    return (
        <div>
            {kurssit.map(kurssi => <Kurssi key={kurssi.nimi} kurssi={kurssi} />)}
        </div>
    )
  }

export default App

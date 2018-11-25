import React from 'react'
import Osa from './Osa'

const Sisalto = ({ osat }) => {
  return (
    <div>
        {osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
    </div>
  )
}

export default Sisalto
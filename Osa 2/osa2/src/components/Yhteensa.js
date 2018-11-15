import React from 'react'

const Yhteensa = ({ osat }) => {
  return (
    <p>yhteensä {osat.reduce((total, osa) => total + osa.tehtavia, 0)} tehtävää</p>
  )
}

export default Yhteensa
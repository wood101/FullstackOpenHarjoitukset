
/* global handleChange */
import React from 'react'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (e) => {
      this.props.store.dispatch(
        filterChange(e.target.value)
      )
    }

    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}
export default Filter
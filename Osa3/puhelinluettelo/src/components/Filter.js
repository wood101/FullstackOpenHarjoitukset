import React, {Component} from 'react';

class Filter extends Component {
    render() {
        return(
        <p>rajaa näytettäviä <input onChange={(e) => this.props.filter(e.target.value)} /></p>
        )    
    }
    
}

export default Filter


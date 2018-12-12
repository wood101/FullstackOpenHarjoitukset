import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return(
      <div style={blogStyle} onClick={() => this.setState({show: !this.state.show})} className='info'>
        <p>{this.props.blog.title} {this.props.blog.author}</p>
        {this.state.show && this.renderCompleteBlog()}
      </div>  
    )
  }

  renderCompleteBlog = () => {
    return (
    <div>
      <p>{this.props.blog.url}</p>
      <p>{this.props.blog.likes} <button  onClick={() => this.props.addALike(this.props.blog)}>like</button> </p>
      {(this.props.user.id === this.props.blog.user._id || this.props.blog.user === null) && <button onClick={() => this.props.removeBlog(this.props.blog)}>delete</button>}
    </div>
    )
  }
}
export default Blog
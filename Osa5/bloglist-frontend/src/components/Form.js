import React, {Component} from 'react';
import blogService from '../services/blogs'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
          newTitle: '',
          newAuthor: '',
          newUrl: '',
          newLikes: '',
          error: '',
          success: ''
        }
      }

    render() {
        return(
            <form onSubmit={this.addBlog}>
                <div>
                    title: <input value={this.state.newTitle}
                    onChange={this.handleTitleChange} />
                </div>
                <div>
                    author: <input value={this.state.newAuthor}
                    onChange={this.handleAuthorChange}/>
                </div>
                <div>
                    url: <input value={this.state.newUrl}
                    onChange={this.handleUrlChange}/>
                </div>
                <div>
                    likes: <input value={this.state.newLikes}
                    onChange={this.handleLikesChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        )    
    }

    handleTitleChange = (event) => {
    this.setState({ newTitle: event.target.value })
    }
    
    handleAuthorChange = (event) => {
    this.setState({ newAuthor: event.target.value })
    }

    handleUrlChange = (event) => {
        this.setState({ newUrl: event.target.value })
    }

    handleLikesChange = (event) => {
        this.setState({ newLikes: event.target.value })
    }

    addBlog = (event) => {
        event.preventDefault()

        const blog = {
            title: this.state.newTitle,
            author: this.state.newAuthor,
            url: this.state.newUrl,
            likes: this.state.newLikes
        }
        
        blogService
        .create(blog)
        .then(blog => {
          this.setState({
            newTitle: '',
            newAuthor: '',
            newUrl: '',
            newLikes: ''
          })
          const blogs = this.props.blogs.concat(blog)
          this.props.newSubmission(blogs, 'Added a new blog ' + blog.title, null)
        }).catch(error => {
          this.props.newSubmission(this.props.blogs, null, 'Title or author cannot be empty')
        })
    }
}
export default Form
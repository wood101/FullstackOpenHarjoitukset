import React from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      error: null,
      success: null,
      messageOpen: true,
      username: '',
      password: '',
      user: null      
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  logout = () => {
    this.setState({
      user: null,
    })
    this.changeSuccessMessage('User logged out')
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  updateBlogs = (blogs, success, error) => {
    this.setState({blogs})
    this.changeSuccessMessage(success)
    this.changeErrorMessage(error)
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  changeErrorMessage = (error) => {
    this.setState({ error })
    setTimeout(() => {
      this.setState({ error: null })
    }, 3000)
  }

  changeSuccessMessage = (success) => {
    this.setState({ success })
    setTimeout(() => {
      this.setState({ success: null })
    }, 3000)

  }  

  removeBlog = async (blog) => {
    if(window.confirm("delete '" + blog.title + "' by " + blog.author + "?")) {
      try{
        const i = this.state.blogs.map(e => e.id).indexOf(blog.id);
        await blogService.remove(blog.id)
        var array = this.state.blogs
        array.splice(i, 1)
        this.setState({blogs: array})
        this.changeSuccessMessage('Removed blog ' + blog.title)
      } catch(exception) {
        this.changeErrorMessage('Something went wrong with removing post')
      }
    }
  }

  addALike = async (blog) => {
    try{
      blog.likes = blog.likes + 1
      await blogService.update(blog.id, blog)
      this.changeSuccessMessage('Liked ' + blog.title)
    } catch(exception) {
      this.changeErrorMessage('Something went wrong with liking a post')
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ 
        username: '',
        password: '',
        user,
      })
      this.changeSuccessMessage('User ' + this.state.user.name + ' logged in')
    } catch(exception) {
      this.changeErrorMessage('Wrong username or password')
    }
  }

  render() {

    const showBlogs = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.sort(function(a, b) {
          return b.likes - a.likes
        }).map(blog => <Blog key={blog.id} blog={blog} addALike = {this.addALike} removeBlog = {this.removeBlog} user = {this.state.user}/>)} 
      </div>
    )

    return (
      <div>
        <Notification errorMessage={this.state.error} successMessage={this.state.success}/>
        {this.state.user === null ?
          <div>
            <Togglable buttonLabel="log in">
              <LoginForm handleLoginFieldChange={this.handleLoginFieldChange} login={this.login} username={this.state.username} password={this.state.password}/>
            </Togglable>
          </div> :
          <div>
            <p>{this.state.user.name} logged in <button onClick={() => this.logout()}>logout</button></p>
            <Togglable buttonLabel="new blog">
              <Form newSubmission = {this.updateBlogs} blogs = {this.state.blogs} />
            </Togglable>
            {showBlogs()}
          </div>
        }
      </div>
    );
  }
}

export default App;

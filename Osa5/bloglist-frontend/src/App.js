import React from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      success: null,
      username: '',
      password: '',
      user: null      
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  updateBlogs = (blogs, success, error) => {
    this.setState({blogs})
    this.setState({success})
    this.setState({error})
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }


  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const showBlogs = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog}/>)} 
      </div>
    )

    return (
      <div>

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <Form newSubmission = {this.updateBlogs} blogs = {this.state.blogs} />
            {showBlogs()}
          </div>
        }
      </div>
    );
  }
}

export default App;

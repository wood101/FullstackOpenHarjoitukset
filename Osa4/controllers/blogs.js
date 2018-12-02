const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

morgan.token('json', function (req, res) { return JSON.stringify(req.body) })
blogsRouter.use(morgan(':method :url :json :status :response-time ms'))

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 } )
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    var likes
    if(body.likes === undefined) {
      likes = 0
    } else {
      likes = body.likes
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })

    const savedData = await blog.save()

    user.blogs = user.blogs.concat(savedData._id)
    await user.save()

    response.json(Blog.format(savedData))

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(blog.user.toString())
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    if(decodedToken.id != user._id) {
      return response.status(401).json({ error: 'only the blogs can be removed only by the creator of the blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    const updatedData = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updatedData))

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter

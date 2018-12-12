const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

  
usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({})
    .populate('blogs')
    response.json(users.map(User.format))
})
  

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' })
    }
    if (body.username.length < 4) {
        return response.status(400).json({ error: 'username must be at least 3 symbols long' })
    }

    var ofAge
    if(body.ofAge === undefined) {
        ofAge = true
    } else {
        ofAge = body.ofAge
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      ofAge,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(User.format(savedUser))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter

let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: 'Robotit valtaa maan',
    author: 'Kirjailija',
    url: 'goodreads.com',
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: 'Robotit rakastavat rauhaa',
    author: 'Parempi Kirjailija',
    url: 'goodreads.com/robot',
    likes: 8,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: 'Roboteilla ei ole mielipidettä asiasta',
    author: ' Paras Kirjailija',
    url: 'goodreads.com/robotit',
    likes: 2,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken}
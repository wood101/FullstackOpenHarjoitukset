const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  var total = 0
  for(let i = 0; i < blogs.length; i++) {
    total += blogs[i].likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  var best = -1
  var blogNumber
  for(let i = 0; i < blogs.length; i++) {
    if(best < blogs[i].likes) {
      best = blogs[i].likes
      blogNumber = i
    }
  }
  return blogs[blogNumber]
}

const mostProfilic = (blogs) => {
  var best = -1
  var bestAuthor
  var current = 0
  const distinctAuthors = [...new Set(blogs.map(blog => blog.author))]
  for(let i = 0; i < distinctAuthors.length; i++) {
    for(let j = 0; j < blogs.length; j++) {
      if(distinctAuthors[i] == blogs[j].author) {
        current++
        if(current > best) {
          best = current
          bestAuthor = distinctAuthors[i]
        }
      }
    }
    current = 0
  }
  const author = ({
    blogsAmount: best,
    author: bestAuthor,
  })
  return author
}

const mostLikes = (blogs) => {
  var best = -1
  var bestAuthor
  var current = 0
  const distinctAuthors = [...new Set(blogs.map(blog => blog.author))]
  for(let i = 0; i < distinctAuthors.length; i++) {
    for(let j = 0; j < blogs.length; j++) {
      if(distinctAuthors[i] == blogs[j].author) {
        current += blogs[j].likes
        if(current > best) {
          best = current
          bestAuthor = distinctAuthors[i]
        }
      }
    }
    current = 0
  }
  const author = ({
    likes: best,
    author: bestAuthor,
  })
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostProfilic,
  mostLikes
}
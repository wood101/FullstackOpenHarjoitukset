import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Robotit valtaa maan',
      author: 'Kirjailija',
      url: 'goodreads.com',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const infoDiv = blogComponent.find('.info')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)

    const likesDiv = blogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes)
  })
})

describe.skip('<SimpleBlog />', () => {
  it('liking works', () => {
    const blog = {
      title: 'Robotit valtaa maan',
      author: 'Kirjailija',
      url: 'goodreads.com',
      likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
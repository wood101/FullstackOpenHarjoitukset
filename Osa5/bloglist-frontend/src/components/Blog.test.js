import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.skip('<Blog />', () => {
  it('renders content', () => {

    const user = {
        id: '5347',  
        username: 'joku'
    }

    const blog = {
      id: '534',  
      title: 'Robotit valtaa maan',
      author: 'Kirjailija',
      url: 'goodreads.com',
      likes: 5,
      user: user
    }

    const blogComponent = shallow(<Blog blog={blog} user={user} />)
    const infoDiv = blogComponent.find('.info')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)

    infoDiv.simulate('click')
    const additionalInfoDiv = blogComponent.find('.info')
    expect(additionalInfoDiv.text()).toContain(blog.url)
    expect(additionalInfoDiv.text()).toContain(blog.likes)

  })
})
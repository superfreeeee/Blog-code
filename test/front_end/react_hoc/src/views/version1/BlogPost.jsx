import React, { Component } from 'react'
import store from '../store'

const TextBlock = (props) => {
  const { title, content } = props
  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
    </div>
  )
}

class BlogPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogPost: store.getBlogPost(props.id),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    store.addChangeListener(this.handleChange)
  }

  componentWillUnmount() {
    store.removeChangeListener(this.handleChange)
  }

  handleChange() {
    this.setState({
      blogPost: store.getBlogPost(this.props.id),
    })
  }

  render() {
    return (
      <div>
        <h2>博客帖子</h2>
        <TextBlock {...this.state.blogPost}></TextBlock>
      </div>
    )
  }
}

export default BlogPost

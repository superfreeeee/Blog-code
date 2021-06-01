import React, { Component } from 'react'
import store from '../store'
import { withSubscription } from './Subscription'

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
  }

  render() {
    const blogPost = this.props.data
    return (
      <div>
        <h2>博客帖子</h2>
        <TextBlock {...blogPost}></TextBlock>
      </div>
    )
  }
}

const SubscribedBlogPost = withSubscription(BlogPost, (store, props) =>
  store.getBlogPost(props.id)
)

export default SubscribedBlogPost

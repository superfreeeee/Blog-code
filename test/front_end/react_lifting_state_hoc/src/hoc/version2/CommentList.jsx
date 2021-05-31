import React, { Component } from 'react'
import { withSubscription } from './Subscription'

const Comment = (props) => {
  const {
    comment: { title, content },
  } = props

  const style = { display: 'inline-block', margin: '5px 0' }

  return (
    <div>
      <h3 style={style}>{title}:</h3> {content}
    </div>
  )
}

class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data: comments } = this.props
    return (
      <div>
        <h2>CommentList 评论列表</h2>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id}></Comment>
        ))}
      </div>
    )
  }
}

const SubscribedCommentList = withSubscription(CommentList, (store) =>
  store.getComments()
)

export default SubscribedCommentList

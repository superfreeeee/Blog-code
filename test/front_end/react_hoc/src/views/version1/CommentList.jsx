import React, { Component } from 'react'
import store from '../store'

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
    this.state = {
      comments: store.getComments(),
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
      comments: store.getComments(),
    })
  }

  render() {
    return (
      <div>
        <h2>CommentList 评论列表</h2>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id}></Comment>
        ))}
      </div>
    )
  }
}

export default CommentList

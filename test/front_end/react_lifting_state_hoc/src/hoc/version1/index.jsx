import React, { Component } from 'react'
import BlogPost from './BlogPost'
import CommentList from './CommentList'

class Version1 extends Component {
  render() {
    return (
      <div>
        <CommentList></CommentList>
        <BlogPost id={1}></BlogPost>
      </div>
    )
  }
}

export default Version1

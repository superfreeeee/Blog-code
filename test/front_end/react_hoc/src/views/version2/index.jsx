import React, { Component } from 'react'
import BlogPost from './BlogPost'
import CommentList from './CommentList'

class Version2 extends Component {
  render() {
    return (
      <div>
        <CommentList></CommentList>
        <BlogPost id={1}></BlogPost>
      </div>
    )
  }
}

export default Version2

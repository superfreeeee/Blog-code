class DataSource {
  listeners = []

  addChangeListener(listener) {
    this.listeners.push(listener)
    console.log(`[DataSource.addChangeListener]listeners`, this.listeners)
  }

  removeChangeListener(listener) {
    const listeners = this.listeners
    if (listeners.includes(listener)) {
      listeners.splice(listeners.indexOf(listener), 1)
      console.log(`[DataSource.removeChangeListener]listeners`, this.listeners)
    }
  }

  notify() {
    this.listeners.forEach((listener) => listener())
  }

  commentId = 0
  comments = []

  addComment(comment) {
    const newComment = {
      ...comment,
      id: this.commentId++,
    }
    this.comments.push(newComment)
    this.notify()
  }

  getComments() {
    return this.comments
  }

  blogPosts = {}

  setBlogPost(id, post) {
    this.blogPosts[id] = post
    this.notify()
  }

  getBlogPost(id) {
    return this.blogPosts[id]
  }
}

export default DataSource

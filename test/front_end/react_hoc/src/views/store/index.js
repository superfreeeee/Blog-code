import DataSource from './DataSource'

const store = new DataSource()

store.addComment({ title: 'Comment A', content: 'blablabla' })
store.addComment({ title: 'Comment B', content: 'blablabla' })

setTimeout(() => {
  store.addComment({ title: 'Comment C', content: 'blablabla' })
}, 1000)

store.setBlogPost(1, { title: 'A Blog Post', content: 'blablabla' })

setTimeout(() => {
  store.setBlogPost(1, { title: 'A Blog Post', content: 'post changed' })
}, 2000)

export default store

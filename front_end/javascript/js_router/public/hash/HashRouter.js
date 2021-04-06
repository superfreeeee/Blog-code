class HashRouter {
  constructor(routes) {
    this.el = document.querySelector('#router-view')
    this.init(routes)
  }

  init(routes) {
    console.log('HashRouter init')
    const onChange = this.change.bind(this)
    // reset hash when reload
    const old = window.onload
    window.onload = function () {
      onChange()
      window.onload = old
    }
    // create page mapper
    const mapper = {}
    for (const route of routes) {
      mapper[route.path] = route
    }
    this.mapper = mapper
    // add hashchange listener
    window.addEventListener('hashchange', onChange)
  }

  change() {
    const hash = location.hash
    const path = hash ? hash.substring(1) : '/'
    console.log(`hash path: ${path}`)
    this.el.innerHTML = this.mapper[path].content
  }
}

const router = new HashRouter(routes)
console.log(router)

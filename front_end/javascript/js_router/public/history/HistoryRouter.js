class HistoryRouter {
  constructor(routes) {
    this.el = document.querySelector('#router-view')
    this.init(routes)
  }

  init(routes) {
    console.log('HistoryRouter init')
    const onChange = this.change.bind(this)
    // reset hash when reload
    const old = window.onload
    window.onload = function () {
      onChange()
      const linkList = document.querySelectorAll('a[href]')
      linkList.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          history.pushState(null, '', link.getAttribute('href'))
          onChange()
        })
      })
      window.onload = old
    }
    // create page mapper
    const mapper = {}
    for (const route of routes) {
      mapper[route.path] = route
    }
    this.mapper = mapper
    // add hashchange listener
    window.addEventListener('popstate', onChange)
  }

  change() {
    const path = location.pathname
    console.log(`hash path: ${path}`)
    this.el.innerHTML = this.mapper[path].content
  }
}

const router = new HistoryRouter(routes)
console.log(router)

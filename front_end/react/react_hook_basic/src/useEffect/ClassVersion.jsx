import React, { Component } from 'react'

class ClassVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Alice',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.ref = React.createRef()
  }

  componentDidMount() {
    document.title = `name: ${this.state.name}`
    this.ref.current.focus()
  }

  componentDidUpdate() {
    document.title = `name: ${this.state.name}`
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        <h3>In Class Component</h3>
        <div>name: {this.state.name}</div>
        <input
          ref={this.ref}
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    )
  }
}

export default ClassVersion

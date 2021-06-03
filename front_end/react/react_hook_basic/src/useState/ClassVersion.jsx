import React, { Component } from 'react'

class ClassVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Alice',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
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
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    )
  }
}

export default ClassVersion

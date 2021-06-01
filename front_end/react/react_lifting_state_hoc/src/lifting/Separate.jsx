import React, { Component } from 'react'

class Single extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temparature: '',
    }
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
  }

  handleTemperatureChange(e) {
    this.setState({ temparature: e.target.value })
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <label>
          {/* 由 props.label 指定输入框标签 */}
          {this.props.label}
          <br />
          <input
            value={this.state.temparature}
            onChange={this.handleTemperatureChange}
          ></input>
        </label>
      </div>
    )
  }
}

class Separate extends Component {
  render() {
    return (
      <div>
        <Single label="摄氏" /> <Single label="华氏" />
      </div>
    )
  }
}

export default Separate

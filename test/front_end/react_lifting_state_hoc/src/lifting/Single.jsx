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
      <div>
        <label>
          摄氏
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

export default Single

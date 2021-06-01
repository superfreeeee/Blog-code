import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000 // fixed 3
  return rounded.toString()
}

const ScaleSymbols = {
  c: Symbol('celsius'),
  f: Symbol('fahrenheit'),
}

class Single extends Component {
  render() {
    const { label, scale, temperature, handleChange } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <label>
          {label}
          <br />
          <input
            value={temperature}
            onChange={(e) => handleChange(scale, e.target.value)}
          ></input>
        </label>
      </div>
    )
  }
}

class LiftingState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: ScaleSymbols.c,
      temperature: '0',
    }
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
  }

  handleTemperatureChange(scale, temperature) {
    this.setState({ scale, temperature })
  }

  render() {
    const { scale, temperature } = this.state
    const celsius =
      scale === ScaleSymbols.c
        ? temperature
        : tryConvert(temperature, toCelsius)
    const fahrenheit =
      scale === ScaleSymbols.f
        ? temperature
        : tryConvert(temperature, toFahrenheit)

    return (
      <div>
        <Single
          label="摄氏"
          scale={ScaleSymbols.c}
          temperature={celsius}
          handleChange={this.handleTemperatureChange}
        />{' '}
        <FontAwesomeIcon icon={faExchangeAlt} />{' '}
        <Single
          label="华氏"
          scale={ScaleSymbols.f}
          temperature={fahrenheit}
          handleChange={this.handleTemperatureChange}
        />
      </div>
    )
  }
}

export default LiftingState

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

class Together extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: ScaleSymbols.c,
      temperature: '0',
    }
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
        <div style={{ display: 'inline-block' }}>
          <label>
            摄氏
            <br />
            <input
              value={celsius}
              onChange={(e) =>
                this.handleTemperatureChange(ScaleSymbols.c, e.target.value)
              }
            ></input>
          </label>
        </div>{' '}
        <FontAwesomeIcon icon={faExchangeAlt} />{' '}
        <div style={{ display: 'inline-block' }}>
          <label>
            华氏
            <br />
            <input
              value={fahrenheit}
              onChange={(e) =>
                this.handleTemperatureChange(ScaleSymbols.f, e.target.value)
              }
            ></input>
          </label>
        </div>
      </div>
    )
  }
}

export default Together

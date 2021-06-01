import React, { Component, useState } from 'react'

function Square(props) {
  const [fixedPosition, setfixedPosition] = useState({ x: 0, y: 0 })
  const [fixed, setfixed] = useState(false)

  const { x, y } = props.position

  const width = 100
  const left = (fixed ? fixedPosition.x : x) - width / 2
  const top = (fixed ? fixedPosition.y : y) - width / 2

  return (
    <div
      style={{
        backgroundColor: 'skyblue',
        position: 'fixed',
        left,
        top,
        width: width,
        height: width,
      }}
      onClick={() => {
        setfixed(!fixed)
        setfixedPosition({ x, y })
      }}
    />
  )
}

class Mouse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    const { x, y } = this.state
    return (
      <div className="backbone" onMouseMove={this.handleMouseMove}>
        <span
          style={{ position: 'relative', top: '10px', left: '10px' }}
        >
          mouse position: ({x}, {y})
        </span>
        {this.props.render(this.state)}
      </div>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Mouse
          render={(position) => <Square position={position} />}
        />
      </div>
    )
  }
}

export default Main

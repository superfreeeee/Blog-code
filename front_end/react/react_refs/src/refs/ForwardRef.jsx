import React, { Component } from 'react'
import { group, log } from '../utils/console'

function OriginButton(props, ref) {
  log(`${props.children} ref: ${ref}`)
  return <button ref={ref}>{props.children}</button>
}

const RefedButton = React.forwardRef(OriginButton)

class ForwardRef extends Component {
  constructor(props) {
    super(props)

    this.refButton = React.createRef()
  }

  componentDidMount() {
    group('ForwardRef', () => {
      log('this.refButton.current', this.refButton.current)
    })
  }

  render() {
    return (
      <div className="block">
        <h2>React.forwardRef - 将 ref 传递给函数组件</h2>
        <RefedButton>不带 ref 的按钮</RefedButton>
        <RefedButton ref={this.refButton}>带 ref 的按钮</RefedButton>
      </div>
    )
  }
}

export default ForwardRef

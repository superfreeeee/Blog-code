import React, { Component } from 'react'
import { group, log } from '../utils/console'

class ClassButton extends Component {
  render() {
    const { buttonRef: ref, children } = this.props
    log(`${children} ref: ${ref}`)
    return <button ref={ref}>{children}</button>
  }
}

function FunctionButton(props) {
  const { buttonRef: ref, children } = props
  log(`${children} ref: ${ref}`)
  return <button ref={ref}>{children}</button>
}

class AliasRef extends Component {
  constructor(props) {
    super(props)

    this.refButton1 = React.createRef()
    this.refButton2 = React.createRef()
  }

  componentDidMount() {
    group('AliasRef', () => {
      log('this.refButton1.current', this.refButton1.current)
      log('this.refButton2.current', this.refButton2.current)
    })
  }

  render() {
    return (
      <div className="block">
        <h2>Ref Props - 将 ref 透过其他 prosp 传递给子组件</h2>
        <ClassButton buttonRef={this.refButton1}>
          类组件按钮
        </ClassButton>
        <FunctionButton buttonRef={this.refButton2}>
          函数组件按钮
        </FunctionButton>
      </div>
    )
  }
}

export default AliasRef

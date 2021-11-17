import React, { Component } from 'react'

export class AClassComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const aStr = this.props.a
    const obj = this.props.obj
    return (
      <div>
        <div>A Class Component</div>
        <div>{aStr}</div>
        <div>{JSON.stringify(obj)}</div>
      </div>
    )
  }
}

export function AFunctionComponent() {
  return <div>A Function Component</div>
}

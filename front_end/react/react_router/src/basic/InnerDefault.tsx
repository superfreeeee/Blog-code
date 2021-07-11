import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { RouteUserParam } from './App'
import { group } from '../utils/msg'

class InnerDefault extends Component<
  RouteComponentProps<RouteUserParam>
> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const match = this.props.match

    group('[Component] InnerDefault componentDidMount', () => {
      console.log('props', this.props)
      console.log('match', match)
    })
  }

  componentDidUpdate() {
    const match = this.props.match

    group('[Component] InnerDefault componentDidUpdate', () => {
      console.log('props', this.props)
      console.log('match', match)
    })
  }

  render() {
    return <div></div>
  }
}

export default withRouter(InnerDefault)

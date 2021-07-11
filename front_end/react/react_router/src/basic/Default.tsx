import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RouteUserParam } from './App'
import { group } from '../utils/msg'
import InnerDefault from './InnerDefault'

class Default extends Component<RouteComponentProps<RouteUserParam>> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const match = this.props.match

    group('[Component] Default componentDidMount', () => {
      console.log('props', this.props)
      console.log('match', match)
    })
  }

  componentDidUpdate() {
    const match = this.props.match

    group('[Component] Default componentDidUpdate', () => {
      console.log('props', this.props)
      console.log('match', match)
    })
  }

  render() {
    const userId = this.props.match.params.userId
    return (
      <div>
        <h2>Default Page</h2>
        {userId && <h3>userId: {userId}</h3>}
        <InnerDefault></InnerDefault>
      </div>
    )
  }
}

export default Default

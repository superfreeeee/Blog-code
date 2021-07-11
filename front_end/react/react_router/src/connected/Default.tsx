import { RouterState } from 'connected-react-router'
import React, { Component } from 'react'
import { connect, ReactReduxContext } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RouteUserParam } from '../basic/App'
import { group } from '../utils/msg'

type DefaultProps = RouteComponentProps<RouteUserParam> & {
  router: RouterState
}

class Default extends Component<DefaultProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    group('[Component] Default componentDidMount', () => {
      console.log('props', this.props)
      console.log('router', this.props.router)
    })
  }

  componentDidUpdate() {
    group('[Component] Default componentDidUpdate', () => {
      console.log('props', this.props)
      console.log('router', this.props.router)
    })
  }

  render() {
    const userId = this.props.match.params.userId
    return (
      <div>
        <h2>Default Page</h2>
        {userId && <h3>userId: {userId}</h3>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Default)

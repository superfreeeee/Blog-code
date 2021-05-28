import React, { Component } from 'react'
import store from '../store'

export function withSubscription(WrappedComponent, selectData) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: selectData(store, props),
      }
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
      store.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      store.removeChangeListener(this.handleChange)
    }

    handleChange() {
      this.setState({
        data: selectData(store, this.props),
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          data={this.state.data}
        ></WrappedComponent>
      )
    }
  }
}

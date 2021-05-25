import React from 'react'

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
    }
    this.bindFunction = this.bindFunction.bind(this)
    this.toggleVisible = this.toggleVisible.bind(this)
  }

  unbindFunction() {
    console.log(this)
  }

  bindFunction() {
    console.log(this)
  }

  toggleVisible() {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <>
        <h2>5. 事件处理</h2>
        <button onClick={this.unbindFunction}>未绑定函数</button>
        <button onClick={this.bindFunction}>绑定函数</button>
        <button onClick={this.toggleVisible}>
          {this.state.visible ? '隐藏文本' : '显示文本'}
        </button>
        <h3 style={{ opacity: this.state.visible ? '100%' : '0%' }}>
          内容文本...
        </h3>
      </>
    )
  }
}

export default Events

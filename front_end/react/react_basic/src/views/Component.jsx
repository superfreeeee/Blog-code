import React from 'react'

class ComponentA extends React.Component {
  render() {
    return <h3>这是一个 class 类组件</h3>
  }
}

function ComponentB() {
  return <h3>这是一个 function 函数组件</h3>
}

const ComponentC = () => {
  return <h3>箭头函数也可以哦</h3>
}

class Component extends React.Component {
  render() {
    return (
      <>
        <h2>2. 组件</h2>
        <ComponentA></ComponentA>
        <ComponentB></ComponentB>
        <ComponentC></ComponentC>
      </>
    )
  }
}

export default Component

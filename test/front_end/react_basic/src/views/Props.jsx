import React from 'react'

function Prop(props) {
  const { prop, value } = props
  return (
    <h4>
      {'> '}
      {prop}: {value}
    </h4>
  )
}

class Props extends React.Component {
  buildProps() {
    const props = []
    for (const prop in this.props) {
      if (prop === 'title') continue
      props.push({ prop, value: JSON.stringify(this.props[prop]) })
    }

    return props.map((prop) => <Prop key={prop.prop} {...prop}></Prop>)
  }

  render() {
    return (
      <>
        <h2>3. Props - 数据传递(从上到下的数据流)</h2>
        <h3>title: {this.props.title}</h3>
        <h3>other props:</h3>
        {this.buildProps()}
      </>
    )
  }
}

export default Props

import React, { Component } from 'react'

function ColoredBlock(props) {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: props.color,
      }}
    ></div>
  )
}

function SkyBlueBlock() {
  return <ColoredBlock color="skyblue" />
}

function CoralBlock() {
  return <ColoredBlock color="coral" />
}

function LimeBlock() {
  return <ColoredBlock color="limegreen" />
}

function CrimsonBlock() {
  return <ColoredBlock color="crimson" />
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <LimeBlock />
        <SkyBlueBlock />
        footer
        <CoralBlock />
        <CrimsonBlock />
      </div>
    )
  }
}

export default Footer

import React, { Component } from 'react'

import SideBar from './SideBar'
import './index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function MenuItem(props) {
  const { label, title, onClick } = props
  return (
    <div className="item" title={title} onClick={onClick}>
      {label}
    </div>
  )
}

function Title(props) {
  return <h3>{props.title}</h3>
}

function UserInfo(props) {
  return <h4>{props.username}</h4>
}

class Composition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItems: [
        { label: 'Menu Item 1', title: 'go menu item 1' },
        { label: 'Menu Item 2', title: 'go menu item 2' },
        { label: 'Menu Item 3', title: 'go menu item 3' },
        { label: 'Menu Item 4', title: 'go menu item 4' },
        { label: 'Menu Item 5', title: 'go menu item 5' },
      ],
    }
  }

  handlerMenuItemSelect(item) {
    console.log('item', item)
  }

  render() {
    const items = this.state.menuItems.map((item) => (
      <MenuItem
        {...item}
        key={item.label}
        onClick={() => this.handlerMenuItemSelect(item)}
      />
    ))

    return (
      <div className="composition">
        <div className="container">
          <SideBar>{items}</SideBar>
          <div className="container vertical">
            <Header
              left={<Title title="This is a title for Header" />}
              right={<UserInfo username="Alice" />}
            />
            <Main />
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Composition

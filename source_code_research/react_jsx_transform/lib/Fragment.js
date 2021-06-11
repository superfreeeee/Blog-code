import React from 'react'

function Item(props) {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    props.data.map((num) => /*#__PURE__*/ React.createElement('li', null, num))
  )
}

function List() {
  const dataList1 = [1, 2, 3]
  const dataList2 = [4, 5, 6]
  return /*#__PURE__*/ React.createElement(
    'ul',
    null,
    /*#__PURE__*/ React.createElement(Item, {
      data: dataList1,
    }),
    /*#__PURE__*/ React.createElement(Item, {
      data: dataList2,
    })
  )
}

export default List

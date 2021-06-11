import React from 'react'

function Item(props) {
  return (
    <>
      {props.data.map((num) => (
        <li>{num}</li>
      ))}
    </>
  )
}

function List() {
  const dataList1 = [1, 2, 3]
  const dataList2 = [4, 5, 6]

  return (
    <ul>
      <Item data={dataList1} />
      <Item data={dataList2} />
    </ul>
  )
}

export default List

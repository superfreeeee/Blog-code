import React, { useState } from 'react'
import { api } from './utils'

// A, B 表示准备中
// C 表示完成
export enum Status {
  A = 1,
  B = 2,
  C = 3,
}

export interface Item {
  id: number
  status: Status
  info: string
}

const initItems = [
  { id: 1, status: Status.A, info: '' },
  { id: 2, status: Status.A, info: '' },
  { id: 3, status: Status.A, info: '' },
]

const List = () => {
  const [items, setItems] = useState<Item[]>(initItems)

  // TODO: 轮训访问接口（重复调用 api）
  // 轮询规则：每十秒调一次，每次将返回列表内 “完成的 item” 更新到 items 中，直到所有 item 都完成
  // api 接口说明（不管 api 实现内容）可用操作为：传入需要查询的 id，返回每个 id 代表的 item 当前的状态

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <div>color: {/* TODO: 准备中显示 red，完成显示 cyan */}</div>
          <div>info: {item.info}</div>
        </div>
      ))}
      <button onClick={() => console.log(...api([1, 2, 3]))}>API</button>
    </div>
  )
}

export default List

import React from 'react'
import AfterCustomer from './AfterCustomer'
import BeforeCustomer from './BeforeCustomer'

function CustomerHookSample() {
  return (
    <div>
      <h2>自定义 Hook - 对相关逻辑进行封装</h2>
      <BeforeCustomer />
      <AfterCustomer />
    </div>
  )
}

export default CustomerHookSample

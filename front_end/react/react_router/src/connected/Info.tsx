import { push, RouterRootState } from 'connected-react-router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { group } from '../utils/msg'

const useInput = (
  initValue: string = ''
): [string, (e: any) => void] => {
  const [input, setInput] = useState(initValue)

  const handleChange = (e) => setInput(e.target.value)

  return [input, handleChange]
}

const Info = () => {
  const router = useSelector((state: RouterRootState) => state.router)
  const dispatch = useDispatch()
  const [input, handleChange] = useInput()

  const goto = () =>
    dispatch(push(`/${input}`, { msg: 'message from Info' }))

  const history = useHistory()

  useEffect(() => {
    group('[Info] updated', () => {
      console.log('router', router)
      console.log('history', history)
    })
  })

  return (
    <div>
      <h3>router path: {router.location.pathname}</h3>
      <label>
        path:{' '}
        <input type="text" value={input} onChange={handleChange} />
      </label>
      <button onClick={goto}>back</button>
    </div>
  )
}

export default Info

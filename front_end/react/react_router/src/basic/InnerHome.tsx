import React from 'react'
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { group } from '../utils/msg'
import { RouteUserParam } from './App'

const InnerHome = (props) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams<RouteUserParam>()
  const match = useRouteMatch()

  group('[Component] InnerHome', () => {
    console.log('props', props)
    console.log('history', history)
    console.log('location', location)
    console.log('params', params)
    console.log('match', match)
  })
  return <div></div>
}

export default InnerHome

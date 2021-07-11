import React from 'react'
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { RouteUserParam } from './App'
import { group } from '../utils/msg'
import InnerHome from './InnerHome'

const Home = (props) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams<RouteUserParam>()
  const match = useRouteMatch()

  const userId = params.userId

  group('[Component] Home', () => {
    console.log('props', props)
    console.log('history', history)
    console.log('location', location)
    console.log('params', params)
    console.log('match', match)
  })

  return (
    <div>
      <h2>Home Page</h2>
      {userId && <h3>userId: {userId}</h3>}
      <InnerHome></InnerHome>
    </div>
  )
}

export default Home

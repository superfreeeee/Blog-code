import { RouterRootState } from 'connected-react-router'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { RouteUserParam } from '../basic/App'
import { group } from '../utils/msg'

const useRoute = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams<RouteUserParam>()
  const match = useRouteMatch()

  return {
    history,
    location,
    params,
    match,
  }
}

const Home = () => {
  const { history, location, params, match } = useRoute()

  const router = useSelector((state: RouterRootState) => state.router)

  const userId = params.userId

  group('[Component] Home', () => {
    console.log('history', history)
    console.log('location', location)
    console.log('params', params)
    console.log('match', match)
    console.log('router', router)
  })

  return (
    <div>
      <h2>Home Page</h2>
      {userId && <h3>userId: {userId}</h3>}
    </div>
  )
}

export default Home

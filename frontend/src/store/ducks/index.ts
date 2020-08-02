import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import { reducer as Auth } from './auth'
import { reducer as User } from './users'

const reducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
    User,
  })

export default reducers

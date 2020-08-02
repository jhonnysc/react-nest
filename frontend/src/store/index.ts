import { routerMiddleware } from 'connected-react-router'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import '@/config/reactotron'
import history from '@/services/history'

import reducers from './ducks'
import sagas from './sagas'

const middlewares = []
const routeMiddleware = routerMiddleware(history)

const sagaMonitor =
  /* eslint-disable */
  process.env.NODE_ENV === 'development' && typeof console.tron !== 'undefined'
    ? console.tron.createSagaMonitor()
    : null
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

middlewares.push(sagaMiddleware)
middlewares.push(routeMiddleware)

/* eslint-disable */
const composer =
  process.env.NODE_ENV === 'development' && typeof console.tron !== 'undefined'
    ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : compose(applyMiddleware(...middlewares))
/* eslint-enable */

const store = createStore(reducers(history), composer)

sagaMiddleware.run(sagas)

export default store

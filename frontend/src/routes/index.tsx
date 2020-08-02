import React from 'react'
import { Switch } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'

import { Home } from '@/pages/home'

import Route from './Route'

interface RouterProps {
  history: History
}

const Routes = (props: RouterProps) => {
  const { history } = props

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Routes

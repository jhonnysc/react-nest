import React from 'react'
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

interface Props extends RouteProps {
  isPrivate?: boolean
  isLogged?: boolean
}

const RouteWrapper: React.FC<Props> = ({
  component: Component,
  isPrivate = false,
  isLogged,
  ...rest
}) => {
  if (!isLogged && isPrivate) return <Redirect to="/" />

  if (!Component) return null

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => <Component {...props} />}
    />
  )
}

export default RouteWrapper

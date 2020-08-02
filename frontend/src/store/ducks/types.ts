import { AuthStateType } from './auth'
import { UserStateType } from './users'

export interface AppState {
  Auth: AuthStateType
  User: UserStateType
}

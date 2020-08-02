import { Action } from 'redux'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

export enum AuthEnum {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',

  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',

  FORGOT_REQUEST = 'FORGOT_REQUEST',
  FORGOT_SUCCESS = 'FORGOT_SUCCESS',
  FORGOT_FAILURE = 'FORGOT_FAILURE',
}

export interface LoginRequestPayload {
  email: string
  password: string
}

export interface LoginSuccessPayload {
  access_token: string
}

export interface ForgotRequestPayload {
  email: string
}

export interface ActionTypes extends Action<AuthEnum> {
  loginRequest: (data: LoginRequestPayload) => Action
  loginSuccess: (data: LoginSuccessPayload) => Action
  loginFailure: () => Action
  logoutRequest: () => Action
  logoutSuccess: () => Action
  logoutFailure: () => Action
  forgotRequest: (data: ForgotRequestPayload) => Action
  forgotSuccess: () => Action
  forgotFailure: () => Action
}

type AuthType = typeof AuthEnum

// CreateActions
export const { Types, Creators } = createActions<AuthType, ActionTypes>({
  loginRequest: { email: '', password: '' },
  loginSuccess: ['access_token'],
  loginFailure: [],
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,
  forgotRequest: ['email'],
  forgotSuccess: null,
  forgotFailure: null,
})

export interface AuthStateType {
  data: {
    name: string
  }
  token: string | null
  email: string | null
  password: string | null
  isAuthorized: boolean
  loading: {
    get: boolean
    post: boolean
    put: boolean
    delete: boolean
  }
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: AuthStateType = Immutable({
  data: {
    name: '',
  },
  token: null,
  email: null,
  password: null,
  isAuthorized: false,
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false,
  },
})

/* ------------- Reducers ------------- */
export const LoginRequest = (
  state: AuthStateType = INITIAL_STATE,
): AuthStateType => ({
  ...state,
  loading: { ...state.loading, post: true },
})

export const LoginRequestSuccess = (
  state: AuthStateType = INITIAL_STATE,
  { access_token }: LoginSuccessPayload,
): AuthStateType => ({
  ...state,
  token: access_token,
  loading: { ...state.loading, post: false },
})

export const LoginRequestFailure = (
  state: AuthStateType = INITIAL_STATE,
): AuthStateType => {
  return {
    ...state,
    loading: { ...state.loading, post: false },
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<AuthStateType, ActionTypes>(
  INITIAL_STATE,
  {
    [Types.LOGIN_REQUEST]: LoginRequest,
    [Types.LOGIN_SUCCESS]: LoginRequestSuccess,
    [Types.LOGIN_FAILURE]: LoginRequestFailure,
  },
)

// /* ------------- Selectors ------------- */

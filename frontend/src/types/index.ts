export interface User {
  _id: string
  name: string
  email: string
  roles: string[]
  hobby: string
  dayOfBirth: string
  age: number
  sex: string
  createdAt: Date
  updatedAt: Date
}

export interface IPaginationOptions {
  limit: number
  page: number
  route?: string
}

export interface IPaginationMeta {
  item_count: number
  total_items: number
  items_per_page: number
  total_pages: number
  current_page: number
}

export interface IPaginationLinks {
  first?: string
  previous?: string
  next?: string
  last?: string
}

export interface UserPagination {
  items?: User[] | null

  meta: IPaginationMeta

  links: IPaginationLinks
}

export interface UserGetQuery {
  limit: number

  page: number

  email?: string

  name?: string

  sort_by?: string
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface CreateUser {
  name: string

  email: string
  password: string

  sex: string

  hobby: string

  dayOfBirth: string

  age: number | string

  roles: Roles[]
}

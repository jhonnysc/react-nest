import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import lodash from 'lodash'

import { AppState } from '@/store/ducks/types'
import { Creators } from '@/store/ducks/users'
import { UserGetQuery, User, CreateUser } from '@/types'
import { TextField } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

import { HomeHeader } from './components/header'
import { ConfirmModal } from './components/modals/confirm-modal'
import { CreateUserModal } from './components/modals/create-user-modal'
import { UpdateUserModal } from './components/modals/update-user-modal'
import { TableHeader } from './components/table-header'
import { TableRow } from './components/table-row'
import {
  Container,
  Table,
  TableRows,
  PaginationContainer,
  SearchFields,
} from './styles'

interface RowCheck {
  [id: string]: boolean
}

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: AppState) => state.User.pagination.items)
  const pagination = useSelector((state: AppState) => state.User.pagination)
  const loadings = useSelector((state: AppState) => state.User.loadings)
  const confirmModalIsOpen = useSelector(
    (state: AppState) => state.User.confirmModalIsOpen,
  )
  const createModalIsOpen = useSelector(
    (state: AppState) => state.User.createModalIsOpen,
  )

  const updateModalIsOpen = useSelector(
    (state: AppState) => state.User.updateModalIsOpen,
  )
  const [checked, setChecked] = useState<boolean>(false)
  const [rowChecked, setRowChecked] = useState<RowCheck>({})
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [debounce, setDebouce] = useState<number>()
  const [modalTitle, setModalTitle] = useState<string>('Adicionar novo usuario')
  const [query, setQuery] = useState<UserGetQuery>({
    limit: 10,
    page: 1,
  })

  const handleSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { id, value } = event.currentTarget

    if (debounce) clearTimeout(debounce)

    const timeout = setTimeout(() => {
      setQuery({ ...query, [id]: value })
    }, 1000)

    setDebouce(timeout)
  }

  const handleDeleteSelected = () => {
    setModalTitle('Deseja realmente deletar todos selecionados?')
    dispatch(Creators.setConfirmModalState(true))
  }

  const handleAdd = () => {
    dispatch(Creators.setCreateModalState(true))
  }

  const handleSort = (field: string) => {
    setQuery({ ...query, sort_by: field })
  }

  const handleConfirmDelete = (user: User) => {
    setModalTitle(`Deseja realmente deletar o usuario ${user.email}?`)
    setSelectedUser(user)
    dispatch(Creators.setConfirmModalState(true))
  }
  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    dispatch(Creators.setUpdateModalState(true))
  }

  const handleCheckAll = (isChecked: boolean) => {
    setChecked(isChecked)
    setRowChecked(lodash.mapValues(rowChecked, () => isChecked))
  }

  const handleCheckRow = (checked: boolean, id: string) => {
    setRowChecked({ ...rowChecked, [id]: checked })
    setChecked(false)
  }

  const handleModalClose = () => {
    dispatch(Creators.setConfirmModalState(false))
  }

  const handleConfirmModal = () => {
    if (selectedUser) dispatch(Creators.deleteUser(selectedUser?._id))
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    if (page === query.page) return false
    return setQuery({ ...query, page })
  }

  const handleCreateUser = (user: CreateUser) => {
    dispatch(
      Creators.createUser({
        ...user,
        age: parseInt(user.age as string, 10),
        dayOfBirth: new Date(user.dayOfBirth).toISOString(),
      }),
    )
  }

  const handleModalCreateClose = () => {
    dispatch(Creators.setCreateModalState(false))
  }

  const handleUpdateUser = (user: CreateUser) => {
    if (selectedUser)
      dispatch(
        Creators.updateUser(
          {
            ...user,
            age: parseInt(user.age as string, 10),
            dayOfBirth: new Date(user.dayOfBirth).toISOString(),
          },
          selectedUser?._id,
        ),
      )
  }

  const handleModalUpdateClose = () => {
    dispatch(Creators.setUpdateModalState(false))
  }

  useEffect(() => {
    dispatch(Creators.requestUsers(query))
  }, [dispatch, query])

  const handleAutoAdd = () => {
    dispatch(Creators.autoCreateUser())
  }

  useEffect(() => {
    const usersChecked = {}
    users?.forEach(user => Object.assign(usersChecked, { [user._id]: false }))
    setRowChecked(usersChecked)
  }, [users])

  useEffect(() => {
    if (!confirmModalIsOpen && !createModalIsOpen && !updateModalIsOpen)
      setSelectedUser(null)
  }, [confirmModalIsOpen, createModalIsOpen, updateModalIsOpen])

  return (
    <Container>
      {confirmModalIsOpen && (
        <ConfirmModal
          onClose={handleModalClose}
          title={modalTitle}
          onConfirm={handleConfirmModal}
          loading={loadings.delete}
        />
      )}

      {createModalIsOpen && (
        <CreateUserModal
          onClose={handleModalCreateClose}
          title="Adicionar novo usuario"
          onConfirm={handleCreateUser}
          loading={loadings.post}
        />
      )}

      {updateModalIsOpen && (
        <UpdateUserModal
          onClose={handleModalUpdateClose}
          title="Atualizar usuario"
          onConfirm={handleUpdateUser}
          loading={loadings.put}
          user={selectedUser}
        />
      )}

      <HomeHeader
        onClick={handleAdd}
        handleDelete={handleDeleteSelected}
        autoAdd={handleAutoAdd}
        pending={loadings.post}
      />

      <Table>
        <SearchFields>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            onChange={handleSearch}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleSearch}
          />
        </SearchFields>
        <TableHeader
          onSort={handleSort}
          checked={checked}
          handleCheck={handleCheckAll}
        />
        <TableRows>
          {users?.map((user, index) => (
            <TableRow
              key={index}
              user={user}
              checked={rowChecked[user._id]}
              handleCheck={handleCheckRow}
              onDelete={handleConfirmDelete}
              onEdit={handleEditUser}
            />
          ))}
        </TableRows>
      </Table>
      <PaginationContainer>
        <Pagination
          count={pagination.meta.total_pages}
          page={pagination.meta.current_page}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  )
}

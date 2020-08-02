import React from 'react'
import { FiTrash, FiEdit } from 'react-icons/fi'

import { User } from '@/types'
import { Checkbox } from '@material-ui/core'

import { Container, Column, IconsContainer } from './styles'

interface TableRowProps {
  checked: boolean
  handleCheck: (checked: boolean, id: string) => void
  onDelete: (user: User) => void
  onEdit: (user: User) => void
  user: User
}

export const TableRow: React.FC<TableRowProps> = ({
  checked,
  handleCheck,

  user,
  onDelete,
  onEdit,
}) => {
  return (
    <Container>
      <Checkbox
        checked={checked || false}
        onChange={(_, checked) => handleCheck(checked, user._id)}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Column id="name" flex="1">
        {user.name}
      </Column>
      <Column id="email" flex="1">
        {user.email}
      </Column>
      <Column id="hobby" flex="1">
        {user.hobby}
      </Column>
      <Column id="dayOfBirth" flex="1">
        {new Date(user.dayOfBirth).toLocaleDateString()}
      </Column>
      <Column id="age" flex="0.5">
        {user.age}
      </Column>
      <Column id="sex" flex="0.5">
        {user.sex}
      </Column>
      <IconsContainer>
        <FiEdit color="blue" onClick={() => onEdit(user)} />
        <FiTrash color="red" onClick={() => onDelete(user)} />
      </IconsContainer>
    </Container>
  )
}

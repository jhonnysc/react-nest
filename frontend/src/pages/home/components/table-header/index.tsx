import React, { ReactNode, useState } from 'react'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

import { Checkbox } from '@material-ui/core'

import { Container, Column, Options } from './styles'

export type Sort = 1 | 0

interface TableHeaderProps {
  onSort: (field: string) => void
  checked: boolean
  handleCheck: (checked: boolean) => void
}

export interface HeaderNames {
  name: ReactNode
  email: ReactNode
  hobby: ReactNode
  dayOfBirth: ReactNode
  age: ReactNode
  sex: ReactNode
}

export enum Selected {
  name = 'name',
  email = 'email',
  hobby = 'hobby',
  dayOfBirth = 'dayOfBirth',
  age = 'age',
  sex = 'sex',
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  onSort,
  checked,
  handleCheck,
}) => {
  const [selected, setSelected] = useState<Selected>(Selected.name)
  const [sortUp, setSortUp] = useState<boolean>(true)

  const icons: HeaderNames = {
    dayOfBirth: sortUp ? <FiArrowUp /> : <FiArrowDown />,
    email: sortUp ? <FiArrowUp /> : <FiArrowDown />,
    hobby: sortUp ? <FiArrowUp /> : <FiArrowDown />,
    name: sortUp ? <FiArrowUp /> : <FiArrowDown />,
    age: sortUp ? <FiArrowUp /> : <FiArrowDown />,
    sex: sortUp ? <FiArrowUp /> : <FiArrowDown />,
  }

  const handleSort = (field: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (selected === field.currentTarget.id) setSortUp(!sortUp)
    setSelected(field.currentTarget.id as Selected)
    onSort(`${!sortUp ? '' : '-'}${field.currentTarget.id}`)
  }
  return (
    <Container>
      <Checkbox
        checked={checked}
        onChange={(_, checked) => handleCheck(checked)}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Column id="name" onClick={handleSort} flex="1">
        Nome
        {selected === 'name' && icons[selected]}
      </Column>
      <Column id="email" onClick={handleSort} flex="1">
        Email
        {selected === 'email' && icons[selected]}
      </Column>
      <Column id="hobby" onClick={handleSort} flex="1">
        Hobby
        {selected === 'hobby' && icons[selected]}
      </Column>
      <Column id="dayOfBirth" onClick={handleSort} flex="1">
        Nascimento
        {selected === 'dayOfBirth' && icons[selected]}
      </Column>
      <Column id="age" flex="0.5" onClick={handleSort}>
        Idade
        {selected === 'age' && icons[selected]}
      </Column>
      <Column id="sex" onClick={handleSort} flex="0.5">
        Sexo
        {selected === 'sex' && icons[selected]}
      </Column>
      <Options>Opções</Options>
    </Container>
  )
}

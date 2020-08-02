import React, { useRef } from 'react'
import Loading from 'react-loading'

import theme from '@/assets/styles/theme'
import { Modal } from '@/components/modal'
import Input from '@/components/ui/input'
import { CreateUser, User } from '@/types'
import { Button } from '@material-ui/core'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { ModalButtons, ModalTitle, FormContainer } from './styles'

interface UpdateUserModalProps {
  title: string
  onConfirm: (user: CreateUser) => void
  onClose: () => void
  loading: boolean
  user: User | null
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  onClose,
  title,
  onConfirm,
  loading,
  user,
}) => {
  const formRef = useRef<FormHandles>(null)
  const handleClose = () => {
    if (!loading) onClose()
  }
  const handleSubmit: SubmitHandler<CreateUser> = user => {
    onConfirm(user)
  }

  return (
    <Modal onClose={onClose} pending={loading}>
      <ModalTitle>{title}</ModalTitle>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={user || {}}>
        <FormContainer>
          <Input name="name" label="Nome" />
          <Input name="email" label="Email" type="email" />
          <Input name="hobby" label="Hobby" />
          <Input
            name="dayOfBirth"
            label="Data de Nascimento"
            type="date"
            required
          />
          <Input name="age" label="Idade" type="number" />
          <Input name="sex" label="Sexo" />
        </FormContainer>
        <ModalButtons>
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <Loading
                color={theme.colors.blue[500]}
                width="25px"
                height="25px"
                type="spin"
              />
            ) : (
              'Atualizar'
            )}
          </Button>
        </ModalButtons>
      </Form>
    </Modal>
  )
}

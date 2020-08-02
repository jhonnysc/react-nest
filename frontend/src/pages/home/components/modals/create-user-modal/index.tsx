import React, { useRef } from 'react'
import Loading from 'react-loading'

import theme from '@/assets/styles/theme'
import { Modal } from '@/components/modal'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { CreateUser } from '@/types'
import { Button } from '@material-ui/core'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { ModalButtons, ModalTitle, FormContainer } from './styles'

interface CreateUserProps {
  title: string
  onConfirm: (user: CreateUser) => void
  onClose: () => void
  loading: boolean
}

export const CreateUserModal: React.FC<CreateUserProps> = ({
  onClose,
  title,
  onConfirm,
  loading,
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContainer>
          <Input required name="name" label="Nome" />
          <Input required name="email" label="Email" type="email" />
          <Input required name="password" label="Senha" type="password" />
          <Input required name="hobby" label="Hobby" />
          <Input
            required
            name="dayOfBirth"
            label="Data de Nascimento"
            type="date"
          />
          <Input required name="age" label="Idade" type="number" />
          <Input required name="sex" label="Sexo" />

          <Select
            required
            name="roles"
            label="Cargo"
            isMulti
            placeholder="Cargos..."
            options={[
              { value: 'USER', label: 'Usuario' },
              { value: 'ADMIN', label: 'Administrador' },
            ]}
          />
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
              'Criar'
            )}
          </Button>
        </ModalButtons>
      </Form>
    </Modal>
  )
}

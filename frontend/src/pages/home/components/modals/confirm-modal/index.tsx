import React from 'react'
import Loading from 'react-loading'

import theme from '@/assets/styles/theme'
import { Modal } from '@/components/modal'
import { Button } from '@material-ui/core'

import { ModalButtons, ModalTitle } from './styles'

interface ConfirmModalProps {
  title: string
  onConfirm: () => void
  onClose: () => void
  loading: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  title,
  onConfirm,
  loading,
}) => {
  const handleClose = () => {
    if (!loading) onClose()
  }
  return (
    <Modal onClose={onClose} pending={loading}>
      <ModalTitle>{title}</ModalTitle>
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
          variant="contained"
          onClick={onConfirm}
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
            'Confirmar'
          )}
        </Button>
      </ModalButtons>
    </Modal>
  )
}

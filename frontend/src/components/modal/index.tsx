import React from 'react'
import { FiX } from 'react-icons/fi'

import { Container, ModalContainer, IconsContainer } from './styles'

interface ModalProps {
  onClose: () => void
  pending?: boolean
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, pending }) => {
  const handleClose = (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event) event.stopPropagation()
    if (!pending) onClose()
  }

  return (
    <Container onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <IconsContainer>
          <FiX cursor="pointer" onClick={() => handleClose()} />
        </IconsContainer>
        {children}
      </ModalContainer>
    </Container>
  )
}

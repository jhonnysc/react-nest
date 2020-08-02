import React from 'react'

import { Button } from '@material-ui/core'

import { Container, HeaderTitle, HeaderButtons, Spacer } from './styles'

export interface HomeHeaderProps {
  onClick: () => void
  handleDelete?: () => void
  autoAdd: () => void
  pending: boolean
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onClick,
  handleDelete,
  autoAdd,
  pending,
}) => {
  return (
    <>
      <Container>
        <HeaderTitle>Gerenciar Desenvolvedores</HeaderTitle>
        <HeaderButtons>
          <Button
            variant="contained"
            color="default"
            onClick={autoAdd}
            disabled={pending}
          >
            Aidicionar Automaticamente 50
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Deletar Selecionados
          </Button>
          <Button variant="contained" color="primary" onClick={onClick}>
            Adicionar Desenvolvedor
          </Button>
        </HeaderButtons>
      </Container>
      <Spacer />
    </>
  )
}

import styled from 'styled-components'

import theme from '@/assets/styles/theme'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  width: 100%;
  background-color: ${theme.colors.blue[100]};
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
`

interface ColumnProps {
  flex: string
}

export const Column = styled.span<ColumnProps>`
  display: flex;
  flex: ${({ flex }) => flex};
  cursor: pointer;
`

export const IconsContainer = styled.div`
  display: grid;
  flex: 0.5;
  grid-auto-flow: column;
  grid-gap: 10px;
  justify-content: center;
  cursor: pointer;
`

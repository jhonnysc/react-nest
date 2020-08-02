import styled from 'styled-components'

import theme from '@/assets/styles/theme'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  width: 100%;
  background-color: ${theme.colors.tangaroa[100]};
`

interface ColumnProps {
  flex: string
}

export const Column = styled.span<ColumnProps>`
  display: flex;
  flex: ${({ flex }) => flex};
  font-weight: bold;
  cursor: pointer;
`

export const Options = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: center;
  font-weight: bold;
`

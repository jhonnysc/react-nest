import styled from 'styled-components'

import theme from '@/assets/styles/theme'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: ${theme.colors.tangaroa[500]};
`

export const Spacer = styled.div`
  height: 80px;
`

export const HeaderTitle = styled.span`
  color: ${theme.colors.blue[300]};
  font-size: 1.5rem;
`

export const HeaderButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
`

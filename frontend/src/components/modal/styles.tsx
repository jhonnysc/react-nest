import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`

export const ModalContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: grid;
  grid-gap: 15px;
  max-width: 50%;
`

export const IconsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

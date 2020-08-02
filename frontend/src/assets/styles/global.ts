import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import theme from './theme'

export default createGlobalStyle`
  /* Normalize CSS */
  ${reset}

  * {
      box-sizing: border-box;
  }

  body, input, button {
    color: ${theme.colors.blue};
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  input, select {
    outline: none;
  }
`

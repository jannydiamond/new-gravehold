import React from 'react'

import { ThemeProvider } from 'styled-components/macro'

import GlobalStyle from 'GlobalStyle'
import mainTheme from 'themes/main'

import MainApp from './MainApp'

const App = () => (
  <ThemeProvider theme={mainTheme}>
    <GlobalStyle />
    <MainApp />
  </ThemeProvider>
)

export default App

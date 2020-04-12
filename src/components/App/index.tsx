import React from 'react'

import { ThemeProvider } from 'styled-components/macro'

import mainTheme from 'themes/main'

import MainApp from './MainApp'

const App = () => (
  <ThemeProvider theme={mainTheme}>
    <MainApp />
  </ThemeProvider>
)

export default App

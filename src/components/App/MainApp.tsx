import React from 'react'

import H1 from 'components/atoms/H1'
import Configurator from 'components/molecules/Configurator'
import Wrapper from './__styled__/Wrapper'

const MainApp = () => {
  return (
    <Wrapper>
      <H1>AER: Custom Expedition Editor</H1>
      <Configurator />
    </Wrapper>
  )
}

export default MainApp

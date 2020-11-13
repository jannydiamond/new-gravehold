import React from 'react'

import H1 from 'components/atoms/H1'
import H2 from 'components/atoms/H2'
import P from 'components/atoms/P'
import Link from 'components/atoms/Link'
import Configurator from 'components/molecules/Configurator'
import Wrapper from './__styled__/Wrapper'

const MainApp = () => {
  return (
    <Wrapper>
      <H1>AER: Custom Expedition Editor</H1>
      <H2>Version: {process.env.REACT_APP_VERSION}</H2>
      <P>
        This is an alpha version of the Custom Expedition Editor for the{' '}
        <Link href="https://aeons-end-randomizer.de" target="_blank">
          Aeons End Randomizer
        </Link>
        .
      </P>
      <Configurator />
      <div id="modal-root" />
    </Wrapper>
  )
}

export default MainApp

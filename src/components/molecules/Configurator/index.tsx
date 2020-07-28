import React from 'react'

import BasicInformation from 'components/templates/BasicInformation'
import Branches from 'components/templates/Branches'
import ConnectBranches from 'components/templates/ConnectBranches'
import InitialBarracks from 'components/templates/InitialBarracks'
import Preview from 'components/molecules/Preview'

import Wrapper from './__styled__/Wrapper'
import Form from './__styled__/Form'

const Configurator = () => {
  return (
    <Wrapper>
      <Form>
        <BasicInformation />
        <Branches />
        <ConnectBranches />
        <InitialBarracks />
      </Form>

      <Preview />
    </Wrapper>
  )
}

export default React.memo(Configurator)

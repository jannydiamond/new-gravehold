import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from 'Redux/Store'

import BasicInformation from 'components/templates/BasicInformation'
import Branches from 'components/templates/Branches'
import Preview from 'components/molecules/Preview'

import Wrapper from './__styled__/Wrapper'
import Form from './__styled__/Form'

const mapStateToProps = (state: RootState) => ({
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(state),
})

type Props = ReturnType<typeof mapStateToProps> & {}

const Configurator = ({
  branches,
}: Props) => {

  // ToDo: REFACTOR: Split form into own components
  return (
    <Wrapper>
      <Form>
        <BasicInformation />
        <Branches />

        {branches.length > 0 ? (
          <ul>
            {branches.map((branch) => {
              return (
                <li key={branch.id}>
                  {branch.id} {branch.type}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No branches added</p>
        )}
      </Form>

      <Preview />
    </Wrapper>
  )
}

export default connect(
  mapStateToProps
)(React.memo(Configurator))

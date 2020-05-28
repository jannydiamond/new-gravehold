import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

import { RootState, selectors } from 'Redux/Store'

import Fieldset from 'components/molecules/Fieldset'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import BaseBranch from './BaseBranch'
import NarrativeBranch from './NarrativeBranch'
import RewardBranch from './RewardBranch'

const mapStateToProps = (state: RootState) => ({
  draftBranch: selectors.DraftExpedition.SequenceConfig.DraftBranch.getDraftBranchState(
    state
  ),
})

type Props = ReturnType<typeof mapStateToProps> & {}

const Body = ({ draftBranch }: Props) => {
  const renderBranch = (branch: types.Branch) => {
    switch (branch.type) {
      case 'narrative': {
        return (
          <NarrativeBranch draftBranch={draftBranch as types.NarrativeBranch} />
        )
      }

      case 'reward': {
        return <RewardBranch draftBranch={draftBranch as types.RewardBranch} />
      }

      default: {
        return <></>
      }
    }
  }

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Branches">
        <BaseBranch draftBranch={draftBranch as types.BranchBase} />

        {renderBranch(draftBranch as types.Branch)}
      </Fieldset>
    </ModalBodyWrapper>
  )
}

export default connect(mapStateToProps)(React.memo(Body))

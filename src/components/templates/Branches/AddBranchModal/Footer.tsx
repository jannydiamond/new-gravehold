import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapStateToProps = (state: RootState) => ({
  draftBranch: selectors.DraftExpedition.SequenceConfig.DraftBranch.getDraftBranchState(
    state
  ),
  draftRewardSupplyCards: selectors.DraftExpedition.SequenceConfig.DraftRewardSupplyCard.getDraftRewardSupplyCardArray(
    state
  ),
})

const mapDispatchToProps = {
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
  clearDraftBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.clearDraftBranch,
  clearDraftRewardSupplyCards:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .clearDraftRewardSupplyCard,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    modal: any
  }

const Footer = ({
  modal,
  draftBranch,
  draftRewardSupplyCards,
  addBranch,
  clearDraftBranch,
  clearDraftRewardSupplyCards,
}: Props) => {
  const handleAddBranch = () => {
    const newBranch = {
      ...draftBranch,
      supply: {
        ...(draftBranch as types.RewardBranch).supply,
        blueprints: [...draftRewardSupplyCards],
      },
    }

    addBranch({
      ...(newBranch as types.Branch),
    })
    clearDraftBranch()
    clearDraftRewardSupplyCards()
    modal.hide()
  }

  const handleCancel = () => {
    clearDraftBranch()
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleAddBranch}>Add branch</Button>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Footer))

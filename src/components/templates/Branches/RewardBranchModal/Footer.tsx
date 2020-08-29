import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapStateToProps = (state: RootState) => ({
  blueprints: selectors.DraftExpedition.SequenceConfig.DraftRewardSupplyCard.getDraftRewardSupplyCardArray(
    state
  ),
})

const mapDispatchToProps = {
  addRewardBranch:
    actions.DraftExpedition.SequenceConfig.Branches.addRewardBranch,
  clearDraftRewardSupplyCard:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .clearDraftRewardSupplyCard,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    modal: any
    branch: types.RewardBranch
    initialBranch: types.RewardBranch
    setBranch: (branch: types.RewardBranch) => void
  }

const Footer = ({
  modal,
  blueprints,
  branch,
  initialBranch,
  setBranch,
  addRewardBranch,
  clearDraftRewardSupplyCard,
}: Props) => {
  const handleAddBranch = () => {
    addRewardBranch({
      ...branch,
      supply: {
        ...branch.supply,
        blueprints: blueprints,
      },
    })

    clearDraftRewardSupplyCard()
    setBranch(initialBranch)
    modal.hide()
  }

  const handleCancel = () => {
    clearDraftRewardSupplyCard()
    setBranch(initialBranch)
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

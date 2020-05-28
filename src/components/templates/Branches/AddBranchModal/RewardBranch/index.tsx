import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

import { actions } from 'Redux/Store'

import Fieldset from 'components/molecules/Fieldset'
import Treasures from './Treasures'
import Mages from './Mages'
import Supply from './Supply'

const mapDispatchToProps = {
  updateDraftBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.updateDraftBranch,
}

type Props = typeof mapDispatchToProps & {
  draftBranch: types.RewardBranch
}

const RewardBranch = ({ 
  draftBranch,
  updateDraftBranch 
}: Props) => {

  const handleRewardTypeChange = (event: React.ChangeEvent) => {
    updateDraftBranch({
      ...draftBranch,
      rewardType: (event.target as HTMLInputElement).value as types.RewardType,
    })
  }

  return (
    <>
      <Fieldset legend="Reward type" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="rewardType"
            id="regular"
            defaultChecked
            value="regular"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor="regular">regular</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="rewardType"
            id="custom"
            value="custom"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor="custom">custom</label>
        </div>
      </Fieldset>
      {draftBranch.rewardType === 'custom' && (
        <>
          <Treasures draftBranch={draftBranch} updateDraftBranch={updateDraftBranch} />
          <Mages draftBranch={draftBranch} updateDraftBranch={updateDraftBranch} />
          <Supply draftBranch={draftBranch} updateDraftBranch={updateDraftBranch} />
        </>
      )}
    </>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(React.memo(RewardBranch))
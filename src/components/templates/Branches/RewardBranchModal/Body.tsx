import React from 'react'

import * as types from 'types'

import Fieldset from 'components/molecules/Fieldset'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import Treasures from './Treasures'
import Mages from './Mages'
import Supply from './Supply'

type Props = {
  branch: types.RewardBranch
  setBranch: (branch: types.RewardBranch) => void
}

const Body = ({ branch, setBranch }: Props) => {
  const handleBranchIdChange = (event: any) => {
    setBranch({
      ...branch,
      id: event.target.value,
    })
  }

  const handleRewardTypeChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      rewardType: (event.target as HTMLInputElement).value as types.RewardType,
    })
  }

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Reward Branch">
        <FormGroupInputText
          id="branchId"
          label="Branch id"
          onChange={handleBranchIdChange}
          defaultValue={branch.id}
          required={true}
        />
      </Fieldset>
      <Fieldset legend="Reward type" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="rewardType"
            id="rewardTypeRegular"
            defaultChecked
            value="regular"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor="rewardTypeRegular">regular</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="rewardType"
            id="rewardTypeCustom"
            value="custom"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor="rewardTypeCustom">custom</label>
        </div>
      </Fieldset>
      {branch.rewardType === 'custom' && (
        <>
          <Treasures branch={branch} setBranch={setBranch} />
          <Mages branch={branch} setBranch={setBranch} />
          <Supply branch={branch} setBranch={setBranch} />
        </>
      )}
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)

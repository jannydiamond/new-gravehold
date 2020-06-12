import React from 'react'

import * as types from 'types'

import Fieldset from 'components/molecules/Fieldset'
import Button from 'components/atoms/Button'
import Treasures from './Treasures'
import Mages from './Mages'
import Supply from './Supply'

type Props = {
  config: types.BattleRewardConfig
  handleChange: (config: types.BattleRewardConfig) => void
  handleDelete: (config: types.BattleRewardConfig) => void
}

const RewardConfig = ({ config, handleChange, handleDelete }: Props) => {
  const handleDeleteRewardConfig = () => {
    handleDelete(config)
  }

  const handleRewardTypeChange = (event: React.ChangeEvent) => {
    const rewardType = (event.target as HTMLInputElement)
      .value as types.RewardType

    handleChange({
      ...config,
      rewardType: rewardType,
      treasure: rewardType === 'custom' ? config.treasure : undefined,
      mage: rewardType === 'custom' ? config.mage : undefined,
      supply: rewardType === 'custom' ? config.supply : undefined,
    })
  }

  return (
    <>
      <Fieldset legend="Reward type" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name={`rewardType-${config._id}`}
            id={`regular-${config._id}`}
            defaultChecked
            value="regular"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor={`regular-${config._id}`}>regular</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name={`rewardType-${config._id}`}
            id={`custom-${config._id}`}
            value="custom"
            onChange={handleRewardTypeChange}
          />
          <label htmlFor={`custom-${config._id}`}>custom</label>
        </div>
      </Fieldset>
      {config.rewardType === 'custom' && (
        <>
          <Treasures config={config} updateDraftRewardConfig={handleChange} />
          <Mages config={config} updateDraftRewardConfig={handleChange} />
          <Supply config={config} updateDraftRewardConfig={handleChange} />
        </>
      )}

      <Button onClick={handleDeleteRewardConfig}>Delete Config</Button>
    </>
  )
}

export default React.memo(RewardConfig)

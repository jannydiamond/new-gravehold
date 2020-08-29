import React from 'react'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import * as types from 'types'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'
import FormGroupInputText from 'components/molecules/FormGroupInputText'

type Props = {
  config: types.BattleRewardConfig
  updateDraftRewardConfig: (config: types.BattleRewardConfig) => void
}

const Treasures = ({ config, updateDraftRewardConfig }: Props) => {
  const dataTreasures: aerTypes.Treasure[] = Object.values(
    DATA.normalizedData.ENG.treasures
  )

  const treasureOptions = dataTreasures.map((treasure: aerTypes.Treasure) => {
    return {
      value: treasure.id,
      label: `${treasure.name} (Level: ${treasure.level})`,
    }
  })

  const handleTreasureChange = (selectOptions: types.SelectOptions) => {
    const selectedTreasureIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    updateDraftRewardConfig({
      ...config,
      ...Object.assign({
        treasure: {
          ...config.treasure,
          ids: [...selectedTreasureIds],
        },
      }),
    })
  }

  const handleTreasureAmountTier1Change = (event: React.ChangeEvent) => {
    updateDraftRewardConfig({
      ...config,
      ...Object.assign({
        treasure: {
          ...config.treasure,
          tier1: parseInt((event.target as HTMLInputElement).value),
        },
      }),
    })
  }

  const handleTreasureAmountTier2Change = (event: React.ChangeEvent) => {
    updateDraftRewardConfig({
      ...config,
      ...Object.assign({
        treasure: {
          ...config.treasure,
          tier2: parseInt((event.target as HTMLInputElement).value),
        },
      }),
    })
  }

  const handleTreasureAmountTier3Change = (event: React.ChangeEvent) => {
    updateDraftRewardConfig({
      ...config,
      ...Object.assign({
        treasure: {
          ...config.treasure,
          tier3: parseInt((event.target as HTMLInputElement).value),
        },
      }),
    })
  }

  return (
    <Accordion id="treasures" title="Treasures" open>
      <FormGroupSelect
        options={treasureOptions}
        id="selectTreasures"
        label="Select Treasures"
        onChange={handleTreasureChange}
        isMulti
      />
      <h3>Random Treasures</h3>
      <p>Enter the amount of random treasures per tier.</p>
      <FormGroupInputText
        id="treasuresTier1"
        label="Tier 1"
        onChange={handleTreasureAmountTier1Change}
        defaultValue={0}
      />
      <FormGroupInputText
        id="treasuresTier2"
        label="Tier 2"
        onChange={handleTreasureAmountTier2Change}
        defaultValue={0}
      />
      <FormGroupInputText
        id="treasuresTier3"
        label="Tier 3"
        onChange={handleTreasureAmountTier3Change}
        defaultValue={0}
      />
    </Accordion>
  )
}

export default React.memo(Treasures)

import React from 'react'
import { connect } from 'react-redux'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Fieldset from 'components/molecules/Fieldset'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupSelect from 'components/molecules/FormGroupSelect'
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox'
import FormGroupTextarea from 'components/molecules/FormGroupTextarea'
import Button from 'components/atoms/Button'
import RewardConfig from './RewardConfig'

const mapStateToProps = (state: RootState) => ({
  rewardConfigs: selectors.DraftExpedition.SequenceConfig.DraftRewardConfig.getDraftRewardConfigArray(
    state
  ),
})

const mapDispatchToProps = {
  addRewardConfig:
    actions.DraftExpedition.SequenceConfig.DraftRewardConfig
      .draftAddRewardConfig,
  editRewardConfig:
    actions.DraftExpedition.SequenceConfig.DraftRewardConfig
      .draftEditRewardConfig,
  deleteRewardConfig:
    actions.DraftExpedition.SequenceConfig.DraftRewardConfig
      .draftDeleteRewardConfig,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    branch: types.BattleBranch
    setBranch: (branch: types.BattleBranch) => void
  }

const Body = ({
  branch,
  rewardConfigs,
  setBranch,
  addRewardConfig,
  editRewardConfig,
  deleteRewardConfig,
}: Props) => {
  const dataNemeses: aerTypes.Nemesis[] = Object.values(
    DATA.normalizedData.ENG.nemeses
  )

  const nemesisOptions = dataNemeses.map((nemesis: aerTypes.Nemesis) => {
    return {
      value: nemesis.id,
      label: nemesis.name,
    }
  })

  const dataUpgradedBasicNemesisCardsCards: aerTypes.UpgradedBasicNemesisCard[] = Object.values(
    DATA.normalizedData.ENG.upgradedBasicNemesisCards
  )

  const upgradedBasicNemesisCardsOptions = dataUpgradedBasicNemesisCardsCards.map(
    (upgradedBasicNemesisCard: aerTypes.UpgradedBasicNemesisCard) => {
      return {
        value: upgradedBasicNemesisCard.id,
        label: upgradedBasicNemesisCard.name,
      }
    }
  )

  const treasureLevelOptions: types.TreasureLevelOptions = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
  ]

  const treasureLevelDefaultValue =
    treasureLevelOptions.find(
      (option) => option.value === branch?.treasure?.level.toString()
    ) ?? treasureLevelOptions.find((option) => option.value === '1')

  const winConfigs = rewardConfigs.filter(
    (config: types.BattleRewardConfig) => config.type === 'win'
  )

  const lossConfigs = rewardConfigs.filter(
    (config: types.BattleRewardConfig) => config.type === 'loss'
  )

  const handleBranchIdChange = (event: any) => {
    setBranch({
      ...branch,
      id: event.target.value,
    })
  }

  const handleBattleTierChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      tier: parseInt(
        (event.target as HTMLInputElement).value
      ) as aerTypes.NemesisTier,
    })
  }

  const handleNemesisIdChange = (selectOption: types.SelectOption) => {
    setBranch({
      ...branch,
      nemesisId: selectOption.value,
    })
  }

  const handleOnLossChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      onLoss: (event.currentTarget as HTMLInputElement).checked
        ? 'skip'
        : false,
    })
  }

  const handleSpecialRulesChange = (event: any) => {
    setBranch({
      ...branch,
      specialRules: event.target.value,
    })
  }

  const handleNewUBNCardsTypeChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      newUBNCards: {
        type: (event.target as HTMLInputElement)
          .value as types.NewUBNCardsTypes,
      },
    })
  }

  const handleUBNCardIdChange = (selectOptions: types.SelectOptions) => {
    const selectedUBNCardIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setBranch({
      ...branch,
      newUBNCards: {
        ...branch.newUBNCards,
        ids: [...selectedUBNCardIds],
      } as types.NewUBNCardsCustomTyp,
    })
  }

  const handleAddRandomChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      newUBNCards: {
        ...branch.newUBNCards,
        addRandom: (event.currentTarget as HTMLInputElement).checked,
      } as types.NewUBNCardsRegularTyp,
    })
  }

  const handleHasTreasureChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      treasure: {
        ...branch.treasure,
        hasTreasure: (event.currentTarget as HTMLInputElement).checked,
        level: (event.currentTarget as HTMLInputElement).checked
          ? branch.treasure.level
          : 1,
      },
    })
  }

  const handleTreasureLevelChange = (
    selectOption: types.TreasureLevelOption
  ) => {
    setBranch({
      ...branch,
      treasure: {
        ...branch.treasure,
        level: parseInt(selectOption.value) as aerTypes.TreasureLevel,
      },
    })
  }

  const handleAddRewardConfig = (type: types.BattleRewardConfigType) => {
    addRewardConfig(type)
  }

  const handleEditRewardConfig = (config: types.BattleRewardConfig) => {
    editRewardConfig(config)
  }

  const handleDeleteRewardConfig = (config: types.BattleRewardConfig) => {
    deleteRewardConfig(config)
  }

  const renderRewardConfigs = (configs: types.BattleRewardConfig[]) => {
    return configs.map((config: types.BattleRewardConfig) => {
      return (
        <RewardConfig
          key={config._id}
          config={config}
          handleChange={handleEditRewardConfig}
          handleDelete={handleDeleteRewardConfig}
        />
      )
    })
  }

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Battle Branch">
        <FormGroupInputText
          id="branchId"
          label="Branch id"
          onChange={handleBranchIdChange}
          defaultValue={branch.id}
          required={true}
        />
      </Fieldset>
      <Fieldset legend="Battle Tier" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="battleTier"
            id="battleTier1"
            defaultChecked
            value="1"
            onChange={handleBattleTierChange}
          />
          <label htmlFor="battleTier1">1</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="battleTier"
            id="battleTier2"
            value="2"
            onChange={handleBattleTierChange}
          />
          <label htmlFor="battleTier2">2</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="battleTier"
            id="battleTier3"
            value="3"
            onChange={handleBattleTierChange}
          />
          <label htmlFor="battleTier3">3</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="battleTier"
            id="battleTier4"
            value="4"
            onChange={handleBattleTierChange}
          />
          <label htmlFor="battleTier4">4</label>
        </div>
      </Fieldset>
      <FormGroupSelect
        options={nemesisOptions}
        id="selectNemesis"
        label="Select Nemesis"
        onChange={handleNemesisIdChange}
      />
      <FormGroupCheckbox
        id="onLoss"
        label="Skip on loss"
        onChange={handleOnLossChange}
        defaultChecked={branch?.onLoss === 'skip' ?? false}
      />
      <FormGroupTextarea
        id="specialRules"
        label="Special rules"
        onChange={handleSpecialRulesChange}
        defaultValue={branch.specialRules}
      />
      <h2>New UBN Cards</h2>
      <Fieldset legend="New UBN Cards" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="newUBNCardsType"
            id="newUBNCardsRegular"
            defaultChecked
            value="regular"
            onChange={handleNewUBNCardsTypeChange}
          />
          <label htmlFor="newUBNCardsRegular">regular</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="newUBNCardsType"
            id="newUBNCardsCustom"
            value="custom"
            onChange={handleNewUBNCardsTypeChange}
          />
          <label htmlFor="newUBNCardsCustom">custom</label>
        </div>
      </Fieldset>
      {branch?.newUBNCards?.type === 'custom' ? (
        <FormGroupSelect
          options={upgradedBasicNemesisCardsOptions}
          id="selectUpgradedBasicNemesisCards"
          label="Select Upgraded Basic Nemesis Cards"
          onChange={handleUBNCardIdChange}
          isMulti
        />
      ) : (
        <FormGroupCheckbox
          id="addRandom"
          label="Add random"
          onChange={handleAddRandomChange}
          defaultChecked={branch.newUBNCards?.addRandom ?? true}
        />
      )}
      <h2>Treasure</h2>
      <FormGroupCheckbox
        id="hasTreasure"
        label="Has treasure"
        onChange={handleHasTreasureChange}
        defaultChecked={branch?.treasure?.hasTreasure ?? false}
      />

      {branch?.treasure?.hasTreasure && (
        <FormGroupSelect
          options={treasureLevelOptions}
          id="selectTreasureLevel"
          label="TreasureLevel"
          onChange={handleTreasureLevelChange}
          defaultValue={treasureLevelDefaultValue}
        />
      )}
      <h2>Win rewards</h2>
      {winConfigs.length !== 0 ? (
        renderRewardConfigs(winConfigs)
      ) : (
        <Button onClick={() => handleAddRewardConfig('win')}>
          Add reward config
        </Button>
      )}

      <h2>Loss rewards</h2>
      <Button onClick={() => handleAddRewardConfig('loss')}>
        Add reward config
      </Button>

      {lossConfigs ? (
        renderRewardConfigs(lossConfigs)
      ) : (
        <p>No loss configs added</p>
      )}
    </ModalBodyWrapper>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Body))

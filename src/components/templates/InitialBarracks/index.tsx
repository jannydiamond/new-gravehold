import React from 'react'
import { connect } from 'react-redux'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import * as types from 'types'

import { RootState, actions, selectors } from 'Redux/Store'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'

const mapStateToProps = (state: RootState) => ({
  barrackMages: selectors.DraftExpedition.InitialBarracksConfig.getBarrackMages(
    state
  ),
  barrackSupplyCards: selectors.DraftExpedition.InitialBarracksConfig.getBarrackSupplyCards(
    state
  ),
  barrackTreasures: selectors.DraftExpedition.InitialBarracksConfig.getBarrackTreasures(
    state
  ),
})

const mapDispatchToProps = {
  setBarrackMages: actions.DraftExpedition.InitialBarracksConfig.setMages,
  setBarrackSupplyCards:
    actions.DraftExpedition.InitialBarracksConfig.setSupplyCards,
  setBarrackTreasures:
    actions.DraftExpedition.InitialBarracksConfig.setTreasures,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const InitialBarracks = ({
  barrackMages,
  barrackSupplyCards,
  barrackTreasures,
  setBarrackMages,
  setBarrackSupplyCards,
  setBarrackTreasures,
}: Props) => {
  const dataMages: aerTypes.Mage[] = Object.values(
    DATA.normalizedData.ENG.mages
  )

  const mageOptions = dataMages.map((mage: aerTypes.Mage) => {
    return {
      value: mage.id,
      label: mage.name,
    }
  })

  const magesDefaultValue = mageOptions.filter(
    (option) => barrackMages.indexOf(option.value) !== -1
  )

  const handleMageChange = (selectOptions: types.SelectOptions) => {
    const selectedMageIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setBarrackMages(selectedMageIds)
  }

  const dataSupply: aerTypes.ICard[] = Object.values(
    DATA.normalizedData.ENG.cards
  )

  const supplyOptions = dataSupply.map((supply: aerTypes.ICard) => {
    return {
      value: supply.id,
      label: `${supply.name} (${supply.type})`,
    }
  })

  const supplyCardsDefaultValue = supplyOptions.filter(
    (option) => barrackSupplyCards.indexOf(option.value) !== -1
  )

  const handleSupplyChange = (selectOptions: types.SelectOptions) => {
    const selectedSupplyIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setBarrackSupplyCards(selectedSupplyIds)
  }

  const dataTreasures: aerTypes.Treasure[] = Object.values(
    DATA.normalizedData.ENG.treasures
  )

  const treasureOptions = dataTreasures.map((treasure: aerTypes.Treasure) => {
    return {
      value: treasure.id,
      label: `${treasure.name} (Level: ${treasure.level})`,
    }
  })

  const treasuresDefaultValue = treasureOptions.filter(
    (option) => barrackTreasures.indexOf(option.value) !== -1
  )

  const handleTreasureChange = (selectOptions: types.SelectOptions) => {
    const selectedTreasureIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setBarrackTreasures(selectedTreasureIds)
  }

  return (
    <Accordion id="initialBarracks" title="Initial Barracks" open>
      <FormGroupSelect
        options={mageOptions}
        id="selectBarrackMages"
        label="Select mages"
        onChange={handleMageChange}
        defaultValue={magesDefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={supplyOptions}
        id="selectBarrackSupply"
        label="Select supply cards"
        onChange={handleSupplyChange}
        defaultValue={supplyCardsDefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={treasureOptions}
        id="selectBarrackTreasures"
        label="Select treasures"
        onChange={handleTreasureChange}
        defaultValue={treasuresDefaultValue}
        isMulti
      />
    </Accordion>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(InitialBarracks))

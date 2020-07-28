import React from 'react'
import { connect } from 'react-redux'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import * as types from 'types'

import { RootState, actions, selectors } from 'Redux/Store'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'

const mapStateToProps = (state: RootState) => ({
  upgradedBasicNemesisCards: selectors.DraftExpedition.InitialUBNCardsConfig.getInitialUBNCardsConfig(
    state
  ),
})

const mapDispatchToProps = {
  setUBNCards: actions.DraftExpedition.InitialUBNCardsConfig.setUBNCards,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const initialUBNCards = ({ upgradedBasicNemesisCards, setUBNCards }: Props) => {
  const dataUBNCards: aerTypes.UpgradedBasicNemesisCard[] = Object.values(
    DATA.normalizedData.ENG.upgradedBasicNemesisCards
  )

  const upgradedBasicNemesisCardsOptions = dataUBNCards.map(
    (upgradedBasicNemesisCard: aerTypes.UpgradedBasicNemesisCard) => {
      return {
        value: upgradedBasicNemesisCard.id,
        label: `${upgradedBasicNemesisCard.name} (${upgradedBasicNemesisCard.type})`,
      }
    }
  )

  const upgradedBasicNemesisCardsDefaultValue = upgradedBasicNemesisCardsOptions.filter(
    (option) => upgradedBasicNemesisCards.indexOf(option.value) !== -1
  )

  const handleUBNCardsChange = (selectOptions: types.SelectOptions) => {
    const selectedUBNCardsIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setUBNCards(selectedUBNCardsIds)
  }

  return (
    <Accordion
      id="initialUBNCards"
      title="Initial Upgraded Basic Nemesis Cards"
      open
    >
      <FormGroupSelect
        options={upgradedBasicNemesisCardsOptions}
        id="selectUBNCards"
        label="Select upgraded basic nemesis cards"
        onChange={handleUBNCardsChange}
        defaultValue={upgradedBasicNemesisCardsDefaultValue}
        isMulti
      />
    </Accordion>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(initialUBNCards))

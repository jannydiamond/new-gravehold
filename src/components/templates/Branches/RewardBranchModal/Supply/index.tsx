import React from 'react'
import { connect } from 'react-redux'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'
import Button from 'components/atoms/Button'
import SupplyCardBlueprint from 'components/molecules/SupplyCardBlueprint'
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox'

const mapStateToProps = (state: RootState) => ({
  blueprints: selectors.DraftExpedition.SequenceConfig.DraftRewardSupplyCard.getDraftRewardSupplyCardArray(
    state
  ),
})

const mapDispatchToProps = {
  addSupplyCard:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .draftAddRewardSupplyCard,
  editSupplyCard:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .draftEditRewardSupplyCard,
  deleteSupplyCard:
    actions.DraftExpedition.SequenceConfig.DraftRewardSupplyCard
      .draftDeleteRewardSupplyCard,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    branch: types.RewardBranch
    setBranch: (branch: types.RewardBranch) => void
  }

const Supply = ({
  branch,
  setBranch,
  blueprints,
  addSupplyCard,
  editSupplyCard,
  deleteSupplyCard,
}: Props) => {
  const dataSupply: aerTypes.ICard[] = Object.values(
    DATA.normalizedData.ENG.cards
  )

  const supplyOptions = dataSupply.map((supply: aerTypes.ICard) => {
    return {
      value: supply.id,
      label: `${supply.name} (${supply.type})`,
    }
  })

  const handleSupplyChange = (selectOptions: types.SelectOptions) => {
    const selectedSupplyIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setBranch({
      ...branch,
      supply: {
        ...branch.supply,
        ids: [...selectedSupplyIds],
      },
    })
  }

  const handleBigPocketChange = (event: React.ChangeEvent) => {
    setBranch({
      ...branch,
      supply: {
        ...branch.supply,
        bigPocket: (event.currentTarget as HTMLInputElement).checked,
      },
    })
  }

  const handleAddSupplyCard = () => {
    addSupplyCard()
  }

  const handleEditSupplyCard = (blueprint: types.Blueprint) => {
    editSupplyCard(blueprint)
  }

  const handleDeleteSupplyCard = (blueprint: types.Blueprint) => {
    deleteSupplyCard(blueprint)
  }

  const renderSupplyBlueprints = (blueprints: types.Blueprint[]) => {
    return blueprints.map((blueprint: types.Blueprint) => {
      return (
        <SupplyCardBlueprint
          key={blueprint._id}
          blueprint={blueprint}
          handleChange={handleEditSupplyCard}
          handleDelete={handleDeleteSupplyCard}
        />
      )
    })
  }

  return (
    <Accordion id="supply" title="Supply" open>
      <FormGroupCheckbox
        id="rewardSupplyBigPocket"
        label="Big Pocket Mode"
        onChange={handleBigPocketChange}
        defaultChecked={branch?.supply?.bigPocket ?? false}
      />
      <FormGroupSelect
        options={supplyOptions}
        id="selectSupplyCards"
        label="Select Supply Cards"
        onChange={handleSupplyChange}
        isMulti
      />
      <h3>Random supply cards</h3>
      <Button onClick={handleAddSupplyCard}>Add random supply card</Button>
      {blueprints ? (
        renderSupplyBlueprints(blueprints)
      ) : (
        <p>No supply cards added</p>
      )}
    </Accordion>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Supply))

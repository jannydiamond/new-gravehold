import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import DATA from 'aer-data'
import * as aerTypes from 'aer-types'

import * as types from 'types'

import { RootState, actions, selectors } from 'Redux/Store'
import { initialState } from 'Redux/Store/DraftExpedition/SettingsSnapshotConfig'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import SupplyTile from 'components/molecules/SupplyTile'
import Button from 'components/atoms/Button'
import Fieldset from 'components/molecules/Fieldset'

const mapStateToProps = (state: RootState) => ({
  supplySetupType: selectors.DraftExpedition.SettingsSnapshotConfig.getSupplySetupType(
    state
  ),
  supplySetupId: selectors.DraftExpedition.SettingsSnapshotConfig.getSupplySetupId(
    state
  ),
  supplySetupName: selectors.DraftExpedition.SettingsSnapshotConfig.getSupplySetupName(
    state
  ),
  tiles: selectors.DraftExpedition.SettingsSnapshotConfig.getSupplyTilesArray(
    state
  ),
  availableMages: selectors.DraftExpedition.SettingsSnapshotConfig.getAvailableMages(
    state
  ),
  availableSupplyCards: selectors.DraftExpedition.SettingsSnapshotConfig.getAvailableSupplyCards(
    state
  ),
  availableTreasures: selectors.DraftExpedition.SettingsSnapshotConfig.getAvailableTreasures(
    state
  ),
  availableNemeses: selectors.DraftExpedition.SettingsSnapshotConfig.getAvailableNemeses(
    state
  ),
  availableUBNCards: selectors.DraftExpedition.SettingsSnapshotConfig.getAvailableUBNCards(
    state
  ),
})

const mapDispatchToProps = {
  setSupplySetup: actions.DraftExpedition.SettingsSnapshotConfig.setSupplySetup,
  setSupplySetupId:
    actions.DraftExpedition.SettingsSnapshotConfig.setSupplySetupId,
  setSupplySetupName:
    actions.DraftExpedition.SettingsSnapshotConfig.setSupplySetupName,
  addSupplyTile: actions.DraftExpedition.SettingsSnapshotConfig.addSupplyTile,
  updateSupplyTile:
    actions.DraftExpedition.SettingsSnapshotConfig.updateSupplyTile,
  deleteSupplyTile:
    actions.DraftExpedition.SettingsSnapshotConfig.deleteSupplyTile,
  setAvailableMages:
    actions.DraftExpedition.SettingsSnapshotConfig.setAvailableMages,
  setAvailableSupplyCards:
    actions.DraftExpedition.SettingsSnapshotConfig.setAvailableSupplyCards,
  setAvailableTreasures:
    actions.DraftExpedition.SettingsSnapshotConfig.setAvailableTreasures,
  setAvailableNemeses:
    actions.DraftExpedition.SettingsSnapshotConfig.setAvailableNemeses,
  setAvailableUBNCards:
    actions.DraftExpedition.SettingsSnapshotConfig.setAvailableUBNCards,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const SettingsSnapshot = ({
  supplySetupType,
  supplySetupId,
  supplySetupName,
  tiles,
  availableMages,
  availableSupplyCards,
  availableTreasures,
  availableNemeses,
  availableUBNCards,
  setSupplySetup,
  setSupplySetupId,
  setSupplySetupName,
  addSupplyTile,
  updateSupplyTile,
  deleteSupplyTile,
  setAvailableMages,
  setAvailableSupplyCards,
  setAvailableTreasures,
  setAvailableNemeses,
  setAvailableUBNCards,
}: Props) => {
  const handleSupplySetupTypeChange = (event: React.ChangeEvent) => {
    const type = (event.target as HTMLInputElement)
      .value as types.SupplySetupType

    type === 'custom'
      ? setSupplySetup({
          id: '',
          name: '',
          type: 'custom',
          active: true,
          tiles: {},
        })
      : setSupplySetup(initialState.supplySetup)
  }

  const dataMarketSetups: aerTypes.IMarketSetup[] = Object.values(
    DATA.marketsetups.setups
  )

  const marketSetupsOptions = dataMarketSetups.map(
    (marketSetup: aerTypes.IMarketSetup) => {
      return {
        value: marketSetup.id,
        label: marketSetup.name,
      }
    }
  )

  const marketSetupsDefaultValue = marketSetupsOptions.filter((option) => {
    const setup = DATA.marketsetups.setups[option.value]

    return setup.id === supplySetupId
  })

  const handleMarketSetupChange = (selectOption: types.SelectOption) => {
    const setup = DATA.marketsetups.setups[selectOption.value]

    setSupplySetup({
      id: setup?.id ?? '',
      name: setup?.name ?? '',
      type: setup?.type ?? 'official',
      active: setup?.active ?? true,
      tiles:
        setup?.tiles.reduce((tiles: types.Tiles, tile: aerTypes.Slot) => {
          const tileId = tile.id ?? shortid.generate()

          const newTile = {
            id: tileId,
            type: tile.type as types.SupplyCardType,
            operation: tile.operation,
          }

          tile.threshold &&
            Object.assign(newTile, {
              threshold: tile.threshold,
            })

          tile.values &&
            Object.assign(newTile, {
              values: tile.values,
            })

          return {
            ...tiles,
            [tileId]: newTile,
          }
        }, {}) ?? {},
    })
  }

  const handleSupplySetupIdChange = (event: any) => {
    setSupplySetupId(event.target.value)
  }

  const handleSupplySetupNameChange = (event: any) => {
    setSupplySetupName(event.target.value)
  }

  const handleAddSupplyCard = () => {
    addSupplyTile()
  }

  const handleUpdateSupplyCard = (tile: aerTypes.MarketTile) => {
    updateSupplyTile(tile)
  }

  const handleDeleteSupplyCard = (tile: aerTypes.MarketTile) => {
    deleteSupplyTile(tile.id)
  }

  const renderSupplyTiles = (tiles: aerTypes.MarketTile[]) => {
    return tiles.map((tile: aerTypes.MarketTile) => {
      return (
        <SupplyTile
          key={tile.id}
          tile={tile}
          handleChange={handleUpdateSupplyCard}
          handleDelete={handleDeleteSupplyCard}
        />
      )
    })
  }

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
    (option) => availableMages.indexOf(option.value) !== -1
  )

  const handleMageChange = (selectOptions: types.SelectOptions) => {
    const selectedMageIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setAvailableMages(selectedMageIds)
  }

  const dataSupply: aerTypes.ICard[] = Object.values(
    DATA.normalizedData.ENG.cards
  )

  const supplyGemOptions = dataSupply
    .filter((supply: aerTypes.ICard) => supply.type === 'Gem')
    .map((supply: aerTypes.ICard) => {
      return {
        value: supply.id,
        label: `${supply.name} (${supply.cost})`,
      }
    })

  const supplyRelicOptions = dataSupply
    .filter((supply: aerTypes.ICard) => supply.type === 'Relic')
    .map((supply: aerTypes.ICard) => {
      return {
        value: supply.id,
        label: `${supply.name} (${supply.cost})`,
      }
    })

  const supplySpellOptions = dataSupply
    .filter((supply: aerTypes.ICard) => supply.type === 'Spell')
    .map((supply: aerTypes.ICard) => {
      return {
        value: supply.id,
        label: `${supply.name} (${supply.cost})`,
      }
    })

  const supplyGemsDefaultValue = supplyGemOptions.filter(
    (option) => availableSupplyCards.indexOf(option.value) !== -1
  )

  const supplyRelicsDefaultValue = supplyRelicOptions.filter(
    (option) => availableSupplyCards.indexOf(option.value) !== -1
  )

  const supplySpellsDefaultValue = supplySpellOptions.filter(
    (option) => availableSupplyCards.indexOf(option.value) !== -1
  )

  const handleSupplyGemChange = (selectOptions: types.SelectOptions) => {
    const selectedGemIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButGemSupplyCards = dataSupply
      .filter((supplyCard: aerTypes.ICard) => supplyCard.type !== 'Gem')
      .filter(
        (supplyCard: aerTypes.ICard) =>
          availableSupplyCards.indexOf(supplyCard.id) !== -1
      )
      .map((supplyCard: aerTypes.ICard) => supplyCard.id)

    setAvailableSupplyCards([...allButGemSupplyCards, ...selectedGemIds])
  }

  const handleSupplyRelicChange = (selectOptions: types.SelectOptions) => {
    const selectedRelicIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButRelicSupplyCards = dataSupply
      .filter((supplyCard: aerTypes.ICard) => supplyCard.type !== 'Relic')
      .filter(
        (supplyCard: aerTypes.ICard) =>
          availableSupplyCards.indexOf(supplyCard.id) !== -1
      )
      .map((supplyCard: aerTypes.ICard) => supplyCard.id)

    setAvailableSupplyCards([...allButRelicSupplyCards, ...selectedRelicIds])
  }

  const handleSupplySpellChange = (selectOptions: types.SelectOptions) => {
    const selectedSpellIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButSpellSupplyCards = dataSupply
      .filter((supplyCard: aerTypes.ICard) => supplyCard.type !== 'Spell')
      .filter(
        (supplyCard: aerTypes.ICard) =>
          availableSupplyCards.indexOf(supplyCard.id) !== -1
      )
      .map((supplyCard: aerTypes.ICard) => supplyCard.id)

    setAvailableSupplyCards([...allButSpellSupplyCards, ...selectedSpellIds])
  }

  const dataTreasures: aerTypes.Treasure[] = Object.values(
    DATA.normalizedData.ENG.treasures
  )

  const treasureLevel1Options = dataTreasures
    .filter((treasure: aerTypes.Treasure) => treasure.level === 1)
    .map((treasure: aerTypes.Treasure) => {
      return {
        value: treasure.id,
        label: treasure.subtype
          ? `${treasure.name} (${treasure.subtype})`
          : treasure.name,
      }
    })

  const treasureLevel2Options = dataTreasures
    .filter((treasure: aerTypes.Treasure) => treasure.level === 2)
    .map((treasure: aerTypes.Treasure) => {
      return {
        value: treasure.id,
        label: treasure.subtype
          ? `${treasure.name} (${treasure.subtype})`
          : treasure.name,
      }
    })

  const treasureLevel3Options = dataTreasures
    .filter((treasure: aerTypes.Treasure) => treasure.level === 3)
    .map((treasure: aerTypes.Treasure) => {
      return {
        value: treasure.id,
        label: treasure.subtype
          ? `${treasure.name} (${treasure.subtype})`
          : treasure.name,
      }
    })

  const treasuresLevel1DefaultValue = treasureLevel1Options.filter(
    (option) => availableTreasures.indexOf(option.value) !== -1
  )

  const treasuresLevel2DefaultValue = treasureLevel2Options.filter(
    (option) => availableTreasures.indexOf(option.value) !== -1
  )

  const treasuresLevel3DefaultValue = treasureLevel3Options.filter(
    (option) => availableTreasures.indexOf(option.value) !== -1
  )

  const handleTreasureLevel1Change = (selectOptions: types.SelectOptions) => {
    const selectedTreasureLevel1Ids: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButLevel1Treasures = dataTreasures
      .filter((treasure: aerTypes.Treasure) => treasure.level !== 1)
      .filter(
        (treasure: aerTypes.Treasure) =>
          availableTreasures.indexOf(treasure.id) !== -1
      )
      .map((treasure: aerTypes.Treasure) => treasure.id)

    setAvailableTreasures([
      ...allButLevel1Treasures,
      ...selectedTreasureLevel1Ids,
    ])
  }

  const handleTreasureLevel2Change = (selectOptions: types.SelectOptions) => {
    const selectedTreasureLevel2Ids: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButLevel2Treasures = dataTreasures
      .filter((treasure: aerTypes.Treasure) => treasure.level !== 2)
      .filter(
        (treasure: aerTypes.Treasure) =>
          availableTreasures.indexOf(treasure.id) !== -1
      )
      .map((treasure: aerTypes.Treasure) => treasure.id)

    setAvailableTreasures([
      ...allButLevel2Treasures,
      ...selectedTreasureLevel2Ids,
    ])
  }

  const handleTreasureLevel3Change = (selectOptions: types.SelectOptions) => {
    const selectedTreasureLevel3Ids: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    const allButLevel3Treasures = dataTreasures
      .filter((treasure: aerTypes.Treasure) => treasure.level !== 3)
      .filter(
        (treasure: aerTypes.Treasure) =>
          availableTreasures.indexOf(treasure.id) !== -1
      )
      .map((treasure: aerTypes.Treasure) => treasure.id)

    setAvailableTreasures([
      ...allButLevel3Treasures,
      ...selectedTreasureLevel3Ids,
    ])
  }

  const dataNemeses: aerTypes.Nemesis[] = Object.values(
    DATA.normalizedData.ENG.nemeses
  )

  const nemesesOptions = dataNemeses.map((nemesis: aerTypes.Nemesis) => {
    return {
      value: nemesis.id,
      label: nemesis.name,
    }
  })

  const nemesesDefaultValue = nemesesOptions.filter(
    (option) => availableNemeses.indexOf(option.value) !== -1
  )

  const handleNemesesChange = (selectOptions: types.SelectOptions) => {
    const selectedNemesisIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setAvailableNemeses(selectedNemesisIds)
  }

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
    (option) => availableUBNCards.indexOf(option.value) !== -1
  )

  const handleUBNCardsChange = (selectOptions: types.SelectOptions) => {
    const selectedUBNCardsIds: string[] = selectOptions
      ? selectOptions.map((option: types.SelectOption) => option.value)
      : []

    setAvailableUBNCards(selectedUBNCardsIds)
  }

  return (
    <Accordion id="settingsSnapshot" title="Settings Snapshot" open>
      <h3>Supply Setup</h3>
      <Fieldset legend="Supply setup type" legendVisible>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="supplySetupType"
            id="supplySetupTypeOfficial"
            defaultChecked
            value="official"
            onChange={handleSupplySetupTypeChange}
          />
          <label htmlFor="supplySetupTypeOfficial">predefined</label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio"
            name="supplySetupType"
            id="supplySetupTypeCustom"
            value="custom"
            onChange={handleSupplySetupTypeChange}
          />
          <label htmlFor="supplySetupTypeCustom">custom</label>
        </div>
      </Fieldset>
      {supplySetupType === 'custom' && supplySetupId !== 'market1Inc' ? (
        <>
          <p>Add your custom supply setup for the expedition.</p>
          <FormGroupInputText
            id="settingsSupplySetupId"
            label="Id"
            onChange={handleSupplySetupIdChange}
            defaultValue={supplySetupId}
          />
          <FormGroupInputText
            id="settingsSupplySetupName"
            label="Name"
            onChange={handleSupplySetupNameChange}
            defaultValue={supplySetupName}
          />
          <Button type="button" onClick={handleAddSupplyCard}>
            Add supply tile
          </Button>
          {tiles.length ? (
            renderSupplyTiles(tiles)
          ) : (
            <p>No supply cards added</p>
          )}
        </>
      ) : (
        <>
          <FormGroupSelect
            options={marketSetupsOptions}
            id="selectMarketSetup"
            label="Select market setup"
            onChange={handleMarketSetupChange}
            defaultValue={marketSetupsDefaultValue}
          />
        </>
      )}
      <h3>Mages ({availableMages.length})</h3>
      <FormGroupSelect
        options={mageOptions}
        id="selectAvailableMages"
        label="Select available mages"
        onChange={handleMageChange}
        defaultValue={magesDefaultValue}
        isMulti
      />
      <h3>Supply Cards ({availableSupplyCards.length})</h3>
      <FormGroupSelect
        options={supplyGemOptions}
        id="selectAvailableGems"
        label="Select available gems"
        onChange={handleSupplyGemChange}
        defaultValue={supplyGemsDefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={supplyRelicOptions}
        id="selectAvailableRelics"
        label="Select available relics"
        onChange={handleSupplyRelicChange}
        defaultValue={supplyRelicsDefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={supplySpellOptions}
        id="selectAvailableSpells"
        label="Select available spells"
        onChange={handleSupplySpellChange}
        defaultValue={supplySpellsDefaultValue}
        isMulti
      />
      <h3>Treasures ({availableTreasures.length})</h3>
      <FormGroupSelect
        options={treasureLevel1Options}
        id="selectAvailableTreasuresLevel1"
        label="Select available level 1 treasures"
        onChange={handleTreasureLevel1Change}
        defaultValue={treasuresLevel1DefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={treasureLevel2Options}
        id="selectAvailableTreasuresLevel2"
        label="Select available level 2 treasures"
        onChange={handleTreasureLevel2Change}
        defaultValue={treasuresLevel2DefaultValue}
        isMulti
      />
      <FormGroupSelect
        options={treasureLevel3Options}
        id="selectAvailableTreasuresLevel3"
        label="Select available level 3 treasures"
        onChange={handleTreasureLevel3Change}
        defaultValue={treasuresLevel3DefaultValue}
        isMulti
      />
      <h3>Nemeses ({availableNemeses.length})</h3>
      <FormGroupSelect
        options={nemesesOptions}
        id="selectAvailableNemeses"
        label="Select available nemeses"
        onChange={handleNemesesChange}
        defaultValue={nemesesDefaultValue}
        isMulti
      />
      <h3>Upgraded Basic Nemesis Cards ({availableUBNCards.length})</h3>
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
)(React.memo(SettingsSnapshot))

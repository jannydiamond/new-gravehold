import React from 'react'

import * as aerTypes from 'aer-types'
import * as types from 'types'

import FormGroupSelect from 'components/molecules/FormGroupSelect'
import FormGroupInputNumber from 'components/molecules/FormGroupInputNumber'
import Button from 'components/atoms/Button'

type Props = {
  tile: aerTypes.MarketTile
  handleChange: (tile: aerTypes.MarketTile) => void
  handleDelete: (tile: aerTypes.MarketTile) => void
}

const SupplyTile = ({ tile, handleChange, handleDelete }: Props) => {
  const cardTypeOptions: types.CardTypeOptions = [
    { value: 'Gem', label: 'Gem' },
    { value: 'Relic', label: 'Relic' },
    { value: 'Spell', label: 'Spell' },
  ]

  const cardTypeDefaultValue = cardTypeOptions.find(
    (option) => option.value === tile.type
  )

  const cardOperationOptions: types.CardOperationOptions = [
    { value: '<', label: '>' },
    { value: '>', label: '<' },
    { value: '=', label: '=' },
    { value: '<=', label: '<=' },
    { value: '>=', label: '>=' },
    { value: 'ANY', label: 'ANY' },
    { value: 'OR', label: 'OR' },
  ]

  const cardOperationDefaultValue = cardOperationOptions.find(
    (option) => option.value === tile.operation
  )

  const cardCostsOptions: types.CardCostsOptions = [
    { value: '0', label: 'Cost: 0' },
    { value: '1', label: 'Cost: 1' },
    { value: '2', label: 'Cost: 2' },
    { value: '3', label: 'Cost: 3' },
    { value: '4', label: 'Cost: 4' },
    { value: '5', label: 'Cost: 5' },
    { value: '6', label: 'Cost: 6' },
    { value: '7', label: 'Cost: 7' },
    { value: '8', label: 'Cost: 8' },
    { value: '9', label: 'Cost: 9' },
  ]

  const handleCardTypeChange = (selectOption: types.CardTypeOption) => {
    handleChange({
      ...tile,
      type: selectOption.value,
    })
  }

  const handleCardOperationChange = (
    selectOption: types.CardOperationOption
  ) => {
    handleChange({
      ...tile,
      operation: selectOption.value,
    })
  }

  const handleCardThresholdChange = (event: React.ChangeEvent) => {
    handleChange({
      ...tile,
      threshold: parseInt((event.target as HTMLInputElement).value),
    })
  }

  const handleCardCostsChange = (selectOptions: types.CardCostsOptions) => {
    const costValues: number[] = selectOptions.map(
      (option: types.CardCostsOption) => parseInt(option.value)
    )

    handleChange({
      ...tile,
      values: [...costValues],
    })
  }

  const handleDeleteTile = () => {
    handleDelete(tile)
  }

  return (
    <div>
      <FormGroupSelect
        options={cardTypeOptions}
        id={`selectCardType${tile.id}`}
        label="Type"
        onChange={handleCardTypeChange}
        defaultValue={cardTypeDefaultValue}
      />
      <FormGroupSelect
        options={cardOperationOptions}
        id={`selectCardOperation${tile.id}`}
        label="Operation"
        onChange={handleCardOperationChange}
        defaultValue={cardOperationDefaultValue}
      />
      {tile.operation !== 'OR' && tile.operation !== 'ANY' && (
        <FormGroupInputNumber
          id={`threshold${tile.id}`}
          label="Threshold"
          onChange={handleCardThresholdChange}
        />
      )}
      {tile.operation === 'OR' && (
        <FormGroupSelect
          options={cardCostsOptions}
          id={`selectCosts${tile.id}`}
          label="Card costs (values)"
          onChange={handleCardCostsChange}
          isMulti
        />
      )}
      <Button type="button" onClick={handleDeleteTile}>
        Delete
      </Button>
    </div>
  )
}

export default SupplyTile

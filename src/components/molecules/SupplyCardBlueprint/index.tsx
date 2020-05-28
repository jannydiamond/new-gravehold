import React from 'react'

import * as types from 'types'

import FormGroupSelect from 'components/molecules/FormGroupSelect'
import FormGroupInputNumber from 'components/molecules/FormGroupInputNumber'
import Button from 'components/atoms/Button'

type Props = {
  blueprint: types.Blueprint
  handleChange: (blueprint: types.Blueprint) => void
  handleDelete: (blueprint: types.Blueprint) => void
}

const SupplyCardBlueprint = ({
  blueprint,
  handleChange,
  handleDelete,
}: Props) => {
  const cardTypeOptions: types.CardTypeOptions = [
    { value: 'Gem', label: 'Gem' },
    { value: 'Relic', label: 'Relic' },
    { value: 'Spell', label: 'Spell' },
  ]

  const cardTypeDefaultValue = cardTypeOptions.find(
    (option) => option.value === blueprint.type
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
    (option) => option.value === blueprint.operation
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
      ...blueprint,
      type: selectOption.value,
    })
  }

  const handleCardOperationChange = (
    selectOption: types.CardOperationOption
  ) => {
    handleChange({
      ...blueprint,
      operation: selectOption.value,
    })
  }

  const handleCardThresholdChange = (event: React.ChangeEvent) => {
    handleChange({
      ...blueprint,
      threshold: parseInt((event.target as HTMLInputElement).value),
    })
  }

  const handleCardCostsChange = (selectOptions: types.CardCostsOptions) => {
    const costValues: number[] = selectOptions.map(
      (option: types.CardCostsOption) => parseInt(option.value)
    )

    handleChange({
      ...blueprint,
      values: [...costValues],
    })
  }

  const handleDeleteBlueprint = () => {
    handleDelete(blueprint)
  }

  return (
    <div>
      <FormGroupSelect
        options={cardTypeOptions}
        id={`selectCardType${blueprint._id}`}
        label="Type"
        onChange={handleCardTypeChange}
        defaultValue={cardTypeDefaultValue}
      />
      <FormGroupSelect
        options={cardOperationOptions}
        id={`selectCardOperation${blueprint._id}`}
        label="Operation"
        onChange={handleCardOperationChange}
        defaultValue={cardOperationDefaultValue}
      />
      {blueprint.operation !== 'OR' && blueprint.operation !== 'ANY' && (
        <FormGroupInputNumber
          id={`threshold${blueprint._id}`}
          label="Threshold"
          onChange={handleCardThresholdChange}
        />
      )}
      {blueprint.operation === 'OR' && (
        <FormGroupSelect
          options={cardCostsOptions}
          id={`selectCosts${blueprint._id}`}
          label="Card costs (values)"
          onChange={handleCardCostsChange}
          isMulti
        />
      )}
      <Button onClick={handleDeleteBlueprint}>Delete</Button>
    </div>
  )
}

export default SupplyCardBlueprint

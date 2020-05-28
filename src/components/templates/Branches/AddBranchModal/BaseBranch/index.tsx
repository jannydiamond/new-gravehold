import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

import { actions } from 'Redux/Store'
import { initialState } from 'Redux/Store/DraftExpedition/SequenceConfig/DraftBranch'

import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupSelect from 'components/molecules/FormGroupSelect'

const mapDispatchToProps = {
  updateDraftBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.updateDraftBranch,
}

type Props = typeof mapDispatchToProps & {
  draftBranch: types.BranchBase
}

const BaseBranch = ({ 
  draftBranch, 
  updateDraftBranch,
}: Props) => {

  const branchTypeOptions: types.BranchTypeOptions = [
    { value: 'narrative', label: 'narrative' },
    { value: 'battle', label: 'battle' },
    { value: 'reward', label: 'reward' },
  ]

  const branchTypeDefaultValue = branchTypeOptions.find(
    (option) => option.value === draftBranch.type
  )

  const handleBranchIdChange = (event: any) => {
    updateDraftBranch({
      ...draftBranch,
      id: event.target.value,
    })
  }

  const handleBranchTypeChange = (selectOption: types.BranchTypeOption) => {
    const { _id, id } = draftBranch

    updateDraftBranch({
      ...initialState,
      _id,
      id,
      type: selectOption.value,
    })
  }

  return (
    <>
      <FormGroupInputText
        id="branchId"
        label="Branch id"
        onChange={handleBranchIdChange}
        defaultValue={draftBranch.id}
        required={true}
      />
      <FormGroupSelect
        options={branchTypeOptions}
        id="branchType"
        label="Branch type"
        onChange={handleBranchTypeChange}
        defaultValue={branchTypeDefaultValue}
      />
    </>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(React.memo(BaseBranch))

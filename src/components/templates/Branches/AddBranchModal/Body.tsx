import React from 'react'

import Fieldset from 'components/molecules/Fieldset'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import Label from 'components/atoms/Label'
import Select from 'components/atoms/Select'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'

type BranchType = 'narrative' | 'battle' | 'reward'

type Branch = {
  id: string,
  type: BranchType,
  nextBranchId?: string[] | string
}

type BranchTypeOption = {
  value: BranchType
  label: string
}

type BranchTypeOptions = BranchTypeOption[]

const branchTypeOptions: BranchTypeOptions = [
  { value: 'narrative', label: 'narrative' },
  { value: 'battle', label: 'battle' },
  { value: 'reward', label: 'reward' },
]

type Props = {
  branch: Branch
  changeId: (event: any) => void
  changeType: (selectOption: BranchTypeOption) => void
}

const Body = ({
  branch,
  changeId,
  changeType
}: Props) => {

  const defaultValue = branchTypeOptions.find(
    (option) => option.value === branch.type
  )

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Branches">
        <FormGroupInputText
          id="branchId"
          label="Branch id"
          onChange={changeId}
          defaultValue={branch.id}
        />

        <Label htmlFor="branchType">Branch type</Label>
        <Select
          options={branchTypeOptions}
          classNamePrefix="ReactSelect"
          id="branchType"
          name="branchType"
          onChange={changeType}
          defaultValue={defaultValue}
        />

      </Fieldset>
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)

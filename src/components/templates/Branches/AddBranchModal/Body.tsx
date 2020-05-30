import React from 'react'

import * as types from 'types'

import Fieldset from 'components/molecules/Fieldset'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupTextarea from 'components/molecules/FormGroupTextarea'
import FormGroupSelect from 'components/molecules/FormGroupSelect'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'

const branchTypeOptions: types.BranchTypeOptions = [
  { value: 'narrative', label: 'narrative' },
  { value: 'battle', label: 'battle' },
  { value: 'reward', label: 'reward' },
]

type Props = {
  branch: types.BranchBase | types.Branch
  changeId: (event: any) => void
  changeType: (selectOption: types.BranchTypeOption) => void
  changeText: (event: any) => void
  changeDecisions: (event: any) => void
}

const Body = ({
  branch,
  changeId,
  changeType,
  changeText,
  changeDecisions,
}: Props) => {

  const defaultValue = branchTypeOptions.find(
    (option) => option.value === branch.type
  )

  const renderBranch = (branch: types.Branch) => {
    switch (branch.type) {
      case 'narrative': {
        return (
          <>
            <FormGroupTextarea
              id="description"
              label="Text"
              onChange={changeText}
              defaultValue={branch.text}
            />
            <p>Add multiple decisions by separating them with ';' followed by a SPACE</p>
            <FormGroupInputText
              id="decisions"
              label="Decisions"
              onChange={changeDecisions}
              defaultValue={branch.decisions ? branch.decisions.map(decision => decision.text) : ''}
            />
          </>
        )
      }

      default: {
        return (
          <>
          </>
        )
      }
    }
  }

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Branches">
        <FormGroupInputText
          id="branchId"
          label="Branch id"
          onChange={changeId}
          defaultValue={branch.id}
          required={true}
        />
        <FormGroupSelect 
          options={branchTypeOptions}
          id="branchType"
          label="Branch type"
          onChange={changeType}
          defaultValue={defaultValue}
        />

        {renderBranch(branch as types.Branch)}
      </Fieldset>
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)

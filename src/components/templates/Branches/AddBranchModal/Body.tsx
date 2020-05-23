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
  branch: types.Branch
  changeId: (event: any) => void
  changeType: (selectOption: types.BranchTypeOption) => void
  changeText: (event: any) => void
  changeDecisions: (event: any) => void
  error: string | null
}

const Body = ({
  branch,
  changeId,
  changeType,
  changeText,
  changeDecisions,
  error,
}: Props) => {

  const defaultValue = branchTypeOptions.find(
    (option) => option.value === branch.type
  )

  return (
    <ModalBodyWrapper>
      {error && (<p>{error}</p>)}
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

        {branch.type === 'narrative' && (
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
        )}
      </Fieldset>
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)

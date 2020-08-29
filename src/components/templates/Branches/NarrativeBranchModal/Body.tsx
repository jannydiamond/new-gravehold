import React from 'react'
import shortid from 'shortid'

import * as types from 'types'

import Fieldset from 'components/molecules/Fieldset'
import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import FormGroupTextarea from 'components/molecules/FormGroupTextarea'
import FormGroupInputText from 'components/molecules/FormGroupInputText'

type Props = {
  branch: types.NarrativeBranch
  setBranch: (branch: types.NarrativeBranch) => void
}

const Body = ({ branch, setBranch }: Props) => {
  const handleBranchIdChange = (event: any) => {
    setBranch({
      ...branch,
      id: event.target.value,
    })
  }

  const handleBranchTextChange = (event: any) => {
    setBranch({
      ...branch,
      text: event.target.value,
    })
  }

  const handleBranchDecisionsChange = (event: any) => {
    const decisions =
      (event.target.value && event.target.value.split('; ')) ?? []
    setBranch({
      ...branch,
      decisions: decisions.map((decision: string) => {
        return {
          _id: shortid.generate(),
          text: decision,
        }
      }),
    })
  }

  return (
    <ModalBodyWrapper>
      <Fieldset legend="Narrative Branch">
        <FormGroupInputText
          id="branchId"
          label="Branch id"
          onChange={handleBranchIdChange}
          defaultValue={branch.id}
          required={true}
        />
        <FormGroupTextarea
          id="description"
          label="Text"
          onChange={handleBranchTextChange}
          defaultValue={branch.text}
        />
        <p>
          Add multiple decisions by separating them with ';' followed by a SPACE
        </p>
        <FormGroupInputText
          id="decisions"
          label="Decisions"
          onChange={handleBranchDecisionsChange}
          defaultValue={
            branch.decisions
              ? branch.decisions.map((decision) => decision.text)
              : ''
          }
        />
      </Fieldset>
    </ModalBodyWrapper>
  )
}

export default React.memo(Body)

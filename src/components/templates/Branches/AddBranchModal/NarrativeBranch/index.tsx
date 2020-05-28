import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid'

import * as types from 'types'

import { actions } from 'Redux/Store'

import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupTextarea from 'components/molecules/FormGroupTextarea'

const mapDispatchToProps = {
  updateDraftBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.updateDraftBranch,
}

type Props = typeof mapDispatchToProps & {
  draftBranch: types.NarrativeBranch
}

const NarrativeBranch = ({ 
  draftBranch, 
  updateDraftBranch 
}: Props) => {
  
  const handleBranchTextChange = (event: any) => {
    updateDraftBranch({
      ...draftBranch,
      text: event.target.value,
    })
  }

  const handleBranchDecisionsChange = (event: any) => {
    const decisions =
      (event.target.value && event.target.value.split('; ')) ?? []
    updateDraftBranch({
      ...draftBranch,
      decisions: decisions.map((decision: string) => {
        return {
          _id: shortid.generate(),
          text: decision,
        }
      }),
    })
  }

  return (
    <>
      <FormGroupTextarea
        id="description"
        label="Text"
        onChange={handleBranchTextChange}
        defaultValue={draftBranch.text}
      />
      <p>
        Add multiple decisions by separating them with ';' followed by a SPACE
      </p>
      <FormGroupInputText
        id="decisions"
        label="Decisions"
        onChange={handleBranchDecisionsChange}
        defaultValue={
          draftBranch.decisions
            ? draftBranch.decisions.map((decision) => decision.text)
            : ''
        }
      />
    </>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(React.memo(NarrativeBranch))
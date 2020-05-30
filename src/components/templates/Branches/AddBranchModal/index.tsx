import React from 'react'
import { connect } from 'react-redux'

import shortid from 'shortid'

import { RootState, selectors, actions } from 'Redux/Store'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

const mapStateToProps = (state: RootState) => ({
  draftBranch: selectors.DraftExpedition.SequenceConfig.DraftBranch.getDraftBranchState(state),
})

const mapDispatchToProps = {
  updateDraftBranch: actions.DraftExpedition.SequenceConfig.DraftBranch.updateDraftBranch,
  saveBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
}

const initialState: types.BranchBase = {
  _id: '',
  id: '',
  type: 'narrative',
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
  modal: types.Modal
}

const AddBranchModal = ({
  modal,
  draftBranch,
  updateDraftBranch,
  saveBranch,
}: Props) => {

  const handleBranchIdChange = (event: any) => {
    updateDraftBranch({
      ...draftBranch,
      id: event.target.value,
    })
  }

  const handleBranchTypeChange = (selectOption: types.BranchTypeOption) => {
    updateDraftBranch({
      ...initialState,
      _id: draftBranch.id,
      id: draftBranch.id,
      type: selectOption.value,
    })
  }

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
          text: decision
        }
      }),
    })
  }

  return (
    <modal.RenderModal
      titleLabel="Add branch"
      footer={<Footer modal={modal} branch={draftBranch as types.Branch} />}>
      <Body 
        branch={draftBranch} 
        changeId={handleBranchIdChange} 
        changeType={handleBranchTypeChange}
        changeText={handleBranchTextChange}
        changeDecisions={handleBranchDecisionsChange}
      />
    </modal.RenderModal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddBranchModal))

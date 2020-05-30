import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapDispatchToProps = {
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
  clearDraftBranch: actions.DraftExpedition.SequenceConfig.DraftBranch.clearDraftBranch,
}

type Props = typeof mapDispatchToProps & {
  modal: any,
  branch: types.Branch
}

const Footer = ({
  modal,
  branch,
  addBranch,
  clearDraftBranch
}: Props) => {

  const handleAddBranch = () => {
    addBranch({
      ...branch,
    })
    clearDraftBranch()
    modal.hide()
  }

  const handleCancel = () => {
    clearDraftBranch()
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleAddBranch}>Add branch</Button>
    </>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(React.memo(Footer))

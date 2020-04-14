import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'Redux/Store'

import Button from 'components/atoms/Button'

const mapDispatchToProps = {
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
}

type BranchType = 'narrative' | 'battle' | 'reward'

type Branch = {
  id: string,
  type: BranchType,
  nextBranchId?: string[] | string
}

type Props = typeof mapDispatchToProps & {
  modal: any,
  branch: Branch
  clearState: () => void
}

const Footer = ({
  modal,
  branch,
  clearState,
  addBranch,
}: Props) => {

  const handleAddBranch = () => {
    addBranch(branch)
    clearState()
    modal.hide()
  }

  const handleCancel = () => {
    clearState()
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

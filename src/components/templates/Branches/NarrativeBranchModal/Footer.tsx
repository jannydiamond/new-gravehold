import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapDispatchToProps = {
  addNarrativeBranch:
    actions.DraftExpedition.SequenceConfig.Branches.addNarrativeBranch,
}

type Props = typeof mapDispatchToProps & {
  modal: any
  branch: types.NarrativeBranch
  initialBranch: types.NarrativeBranch
  setBranch: (branch: types.NarrativeBranch) => void
}

const Footer = ({
  modal,
  branch,
  initialBranch,
  setBranch,
  addNarrativeBranch,
}: Props) => {
  const handleAddBranch = () => {
    addNarrativeBranch(branch)
    setBranch(initialBranch)
    modal.hide()
  }

  const handleCancel = () => {
    setBranch(initialBranch)
    modal.hide()
  }

  return (
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleAddBranch}>Add branch</Button>
    </>
  )
}

export default connect(null, mapDispatchToProps)(React.memo(Footer))

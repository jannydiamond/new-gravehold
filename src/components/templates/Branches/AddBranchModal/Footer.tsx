import React from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'

import { actions } from 'Redux/Store'

import * as types from 'types'

import Button from 'components/atoms/Button'

const mapDispatchToProps = {
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
}

type Props = typeof mapDispatchToProps & {
  modal: any,
  branch: types.Branch
  clearState: () => void
  handleError: (error: string) => void
}

const Footer = ({
  modal,
  branch,
  clearState,
  addBranch,
  handleError,
}: Props) => {

  const handleAddBranch = () => {
    console.log(branch.id)
    if (branch.id === "") {
      handleError('The branch id is manatory!')
      return
    }

    addBranch({
      ...branch,
      _id: shortid.generate()
    })
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

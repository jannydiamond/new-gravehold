import React, { useState } from 'react'
import shortid from 'shortid'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

const initialState: types.Branch = {
  _id: '',
  id: '',
  type: 'narrative',
  text: '',
  decisions: false
}

type Props = {
  modal: types.Modal
}

const AddBranchModal = ({
  modal
}: Props) => {
  const [branch, setBranch] = useState<types.Branch>(initialState)
  const [error, setError] = useState<string | null>(null)

  const handleBranchIdChange = (event: any) => {
    setBranch({
      ...branch,
      id: event.target.value,
    })
  }

  const handleBranchTypeChange = (selectOption: types.BranchTypeOption) => {
    const id = branch.id
    
    setBranch({
      ...initialState,
      id: id,
      type: selectOption.value,
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
          text: decision
        }
      }),
    })
  }

  const handleClearState = () => {
    setBranch(initialState)
  }

  const handleError = (error: string) => {
    setError(error)
  }

  return (
    <modal.RenderModal
      titleLabel="Add branch"
      footer={<Footer modal={modal} branch={branch} clearState={handleClearState} handleError={handleError} />}>
      <Body 
        branch={branch} 
        changeId={handleBranchIdChange} 
        changeType={handleBranchTypeChange}
        changeText={handleBranchTextChange}
        changeDecisions={handleBranchDecisionsChange}
        error={error}
         />
    </modal.RenderModal>
  )
}

export default React.memo(AddBranchModal)

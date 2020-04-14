import React, { useState } from 'react'

import Body from './Body'
import Footer from './Footer'

type BranchType = 'narrative' | 'battle' | 'reward'

type Branch = {
  id: string,
  type: BranchType,
  nextBranchId?: string[] | string
}

type BranchTypeOption = {
  value: BranchType
  label: string
}

const initialState: Branch = {
  id: '',
  type: 'narrative',
}

type Props = {
  modal: any
}

const AddBranchModal = ({
  modal
}: Props) => {
  const [branch, setBranch] = useState<Branch>(initialState)

  const handleBranchIdChange = (event: any) => {
    setBranch({
      ...branch,
      id: event.target.value,
    })
  }

  const handleBranchTypeChange = (selectOption: BranchTypeOption) => {
    setBranch({
      ...branch,
      type: selectOption.value,
    })
  }

  const handleClearState = () => {
    setBranch(initialState)
  }

  return (
    <modal.RenderModal
      titleLabel="Add branch"
      footer={<Footer modal={modal} branch={branch} clearState={handleClearState} />}>
      <Body branch={branch} changeId={handleBranchIdChange} changeType={handleBranchTypeChange} />
    </modal.RenderModal>
  )
}

export default React.memo(AddBranchModal)

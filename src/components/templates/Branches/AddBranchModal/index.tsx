import React from 'react'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

type Props = {
  modal: types.Modal
}

const AddBranchModal = ({
  modal,
}: Props) => {

  return (
    <modal.RenderModal
      titleLabel="Add branch"
      footer={<Footer modal={modal} />}>
      <Body />
    </modal.RenderModal>
  )
}

export default React.memo(AddBranchModal)

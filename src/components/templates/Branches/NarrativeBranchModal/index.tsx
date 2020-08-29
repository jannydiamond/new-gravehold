import React, { useState } from 'react'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

type Props = {
  modal: types.Modal
}

const initialBranch: types.NarrativeBranch = {
  _id: '',
  id: '',
  type: 'narrative',
  text: '',
  decisions: false,
}

const NarrativeBranchModal = ({ modal }: Props) => {
  const [branch, setBranch] = useState<types.NarrativeBranch>(initialBranch)

  return (
    <modal.RenderModal
      titleLabel="Add narrative branch"
      footer={
        <Footer
          modal={modal}
          branch={branch}
          setBranch={setBranch}
          initialBranch={initialBranch}
        />
      }
    >
      <Body branch={branch} setBranch={setBranch} />
    </modal.RenderModal>
  )
}

export default React.memo(NarrativeBranchModal)

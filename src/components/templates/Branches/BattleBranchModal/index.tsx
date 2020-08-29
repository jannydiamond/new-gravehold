import React, { useState } from 'react'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

type Props = {
  modal: types.Modal
}

const initialBranch: types.BattleBranch = {
  _id: '',
  id: '',
  type: 'battle',
  tier: 1,
  treasure: {
    level: 1,
    hasTreasure: false,
  },
  newUBNCards: {
    type: 'regular',
  },
}

const BattleBranchModal = ({ modal }: Props) => {
  const [branch, setBranch] = useState<types.BattleBranch>(initialBranch)

  return (
    <modal.RenderModal
      titleLabel="Add battle branch"
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

export default React.memo(BattleBranchModal)

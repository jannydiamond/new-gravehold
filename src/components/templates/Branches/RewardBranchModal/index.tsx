import React, { useState } from 'react'

import * as types from 'types'

import Body from './Body'
import Footer from './Footer'

type Props = {
  modal: types.Modal
}

const initialBranch: types.RewardBranch = {
  _id: '',
  id: '',
  type: 'reward',
  rewardType: 'regular',
  treasure: {
    ids: [],
    tier1: 0,
    tier2: 0,
    tier3: 0,
  },
  mage: {
    ids: [],
    randomAmount: 0,
  },
  supply: {
    ids: [],
    blueprints: [],
  },
}

const RewardBranchModal = ({ modal }: Props) => {
  const [branch, setBranch] = useState<types.RewardBranch>(initialBranch)

  return (
    <modal.RenderModal
      titleLabel="Add reward branch"
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

export default React.memo(RewardBranchModal)

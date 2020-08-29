import React from 'react'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import NarrativeBranchModal from './NarrativeBranchModal'
import RewardBranchModal from './RewardBranchModal'

const Branches = () => {
  const narrativeBranchModal = useModal()
  const rewardBranchModal = useModal()

  const handleShowNarrativeBranchModal = () => {
    narrativeBranchModal.show()
  }

  const handleShowRewardBranchModal = () => {
    rewardBranchModal.show()
  }

  return (
    <Accordion id="branches" title="Branches" open>
      <Button
        type="button"
        style={{ display: 'block' }}
        onClick={handleShowNarrativeBranchModal}
      >
        Add narrative branch
      </Button>
      <Button
        type="button"
        style={{ display: 'block' }}
        onClick={handleShowRewardBranchModal}
      >
        Add reward branch
      </Button>

      <NarrativeBranchModal modal={narrativeBranchModal} />
      <RewardBranchModal modal={rewardBranchModal} />
    </Accordion>
  )
}

export default React.memo(Branches)

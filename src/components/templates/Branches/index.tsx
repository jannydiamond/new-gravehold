import React from 'react'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import NarrativeBranchModal from './NarrativeBranchModal'
import RewardBranchModal from './RewardBranchModal'
import BattleBranchModal from './BattleBranchModal'

const Branches = () => {
  const narrativeBranchModal = useModal()
  const rewardBranchModal = useModal()
  const battleBranchModal = useModal()

  const handleShowNarrativeBranchModal = () => {
    narrativeBranchModal.show()
  }

  const handleShowRewardBranchModal = () => {
    rewardBranchModal.show()
  }

  const handleShowBattleBranchModal = () => {
    battleBranchModal.show()
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
      <Button
        type="button"
        style={{ display: 'block' }}
        onClick={handleShowBattleBranchModal}
      >
        Add battle branch
      </Button>

      <NarrativeBranchModal modal={narrativeBranchModal} />
      <RewardBranchModal modal={rewardBranchModal} />
      <BattleBranchModal modal={battleBranchModal} />
    </Accordion>
  )
}

export default React.memo(Branches)

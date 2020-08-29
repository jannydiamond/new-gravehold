import React from 'react'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import NarrativeBranchModal from './NarrativeBranchModal'

const Branches = () => {
  const narrativeBranchModal = useModal()

  const handleShowNarrativeBranchModal = () => {
    narrativeBranchModal.show()
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
      <NarrativeBranchModal modal={narrativeBranchModal} />
    </Accordion>
  )
}

export default React.memo(Branches)

import React from 'react'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import AddBranchModal from './AddBranchModal'

const Branches = () => {
  const addBranchModal = useModal()

  return (
    <Accordion id="branches" title="Branches" open>
      <Button
        type="button"
        style={{ display: 'block' }}
        onClick={() => addBranchModal.show()}
      >
        Add branch
        </Button>
      <AddBranchModal modal={addBranchModal} />
    </Accordion>
  )
}

export default React.memo(Branches)

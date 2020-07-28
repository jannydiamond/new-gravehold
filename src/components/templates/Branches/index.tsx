import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import AddBranchModal from './AddBranchModal'

const mapStateToProps = (state: RootState) => ({
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
})

const mapDispatchToProps = {
  draftAddBranch:
    actions.DraftExpedition.SequenceConfig.DraftBranch.draftAddBranch,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const Branches = ({ branches, draftAddBranch }: Props) => {
  const addBranchModal = useModal()

  const handleAddBranch = () => {
    addBranchModal.show()
    draftAddBranch()
  }

  return (
    <Accordion id="branches" title="Branches" open>
      <Button
        type="button"
        style={{ display: 'block' }}
        onClick={handleAddBranch}
      >
        Add branch
      </Button>
      <AddBranchModal modal={addBranchModal} />
    </Accordion>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Branches))

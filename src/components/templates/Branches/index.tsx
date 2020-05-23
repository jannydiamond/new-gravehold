import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from 'Redux/Store'

import { useModal } from 'hooks/useModal'

import Accordion from 'components/organisms/Accordion'
import Button from 'components/atoms/Button'
import AddBranchModal from './AddBranchModal'
import * as types from 'types'

const mapStateToProps = (state: RootState) => ({
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
})

type Props = ReturnType<typeof mapStateToProps> & {}

const Branches = ({
  branches
}: Props) => {
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

      {branches.length > 0 ? (
        <ul>
          {branches.map((branch: types.Branch) => {
            return (
              <li key={branch.id}>
                <p>{branch.id} {branch.type}</p>
                {branch.text && (<p>{branch.text}</p>)}
                {branch.decisions && (
                  <ul>
                    {branch.decisions.map(
                      (decision: types.Decision) => (
                        <li key={decision._id}>{decision.text}</li>
                      )
                    )}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <p>No branches added</p>
      )}
    </Accordion>
  )
}

export default connect(
  mapStateToProps
)(React.memo(Branches))

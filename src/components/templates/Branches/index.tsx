import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

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

      {branches.length > 0 ? (
        <ul>
          {branches.map((branch: types.Branch) => {
            switch (branch.type) {
              case 'narrative': {
                const narrativeBranch = branch as types.NarrativeBranch

                return (
                  <li key={branch.id}>
                    <p>Id: {branch.id}</p>
                    <p>Type: {branch.type}</p>
                    {narrativeBranch.text && (
                      <p>Text: {narrativeBranch.text}</p>
                    )}
                    {narrativeBranch.decisions ? (
                      <>
                        <p>Desicions:</p>
                        <ul>
                          {narrativeBranch.decisions.map(
                            (decision: types.Decision) => (
                              <li key={decision._id}>{decision.text}</li>
                            )
                          )}
                        </ul>
                      </>
                    ) : (
                      <p>No Desicions</p>
                    )}
                  </li>
                )
              }

              case 'reward': {
                const rewardBranch = branch as types.RewardBranch

                return (
                  <li key={branch.id}>
                    <p>Id: {branch.id}</p>
                    <p>Type: {branch.type}</p>
                    {rewardBranch.rewardType && (
                      <p>Reward type: {rewardBranch.rewardType}</p>
                    )}
                  </li>
                )
              }

              case 'battle': {
                const battleBranch = branch as types.BattleBranch

                return (
                  <li key={branch.id}>
                    <p>Id: {branch.id}</p>
                    <p>Type: {branch.type}</p>
                    <p>Tier: {battleBranch.tier}</p>
                    {battleBranch.nemesisId && (
                      <p>Nemesis: {battleBranch.nemesisId}</p>
                    )}
                  </li>
                )
              }

              default: {
                return (
                  <li key={branch.id}>
                    <p>Id: {branch.id}</p>
                    <p>Type: {branch.type}</p>
                  </li>
                )
              }
            }
          })}
        </ul>
      ) : (
        <p>No branches added</p>
      )}
    </Accordion>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Branches))

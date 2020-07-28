import React from 'react'
import { connect } from 'react-redux'

import * as types from 'types'

import { RootState, actions, selectors } from 'Redux/Store'

import Accordion from 'components/organisms/Accordion'
import FormGroupSelect from 'components/molecules/FormGroupSelect'

const mapStateToProps = (state: RootState) => ({
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
  firstBranchId: selectors.DraftExpedition.SequenceConfig.FirstBranchId.getFirstBranchId(
    state
  ),
})

const mapDispatchToProps = {
  updateBranch: actions.DraftExpedition.SequenceConfig.Branches.updateBranch,
  setFirstBranchId:
    actions.DraftExpedition.SequenceConfig.FirstBranchId.setFirstBranchId,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const ConnectBranches = ({
  branches,
  firstBranchId,
  updateBranch,
  setFirstBranchId,
}: Props) => {
  const availableBranchesOptions = branches.map((branch: types.Branch) => {
    return {
      value: branch.id,
      label: `${branch.id} (${branch.type})`,
    }
  })

  const handleFirstBranchIdChange = (selectOption: types.SelectOption) => {
    setFirstBranchId(selectOption.value)
  }

  const handleNarrativNextBranchIdChange = (
    selectOption: types.SelectOption & {
      currentBranchId: string
      decisionId: string
    }
  ) => {
    const branchToUpdate = branches.find(
      (branch) => branch.id === selectOption.currentBranchId
    ) as types.NarrativeBranch

    const newDecisions =
      branchToUpdate?.decisions &&
      branchToUpdate?.decisions.map((decision: types.Decision) => {
        if (decision._id === selectOption.decisionId) {
          return {
            ...decision,
            nextBranchId: selectOption.value,
          }
        } else {
          return decision
        }
      })

    updateBranch({
      ...branchToUpdate,
      decisions: newDecisions,
      nextBranchId:
        newDecisions &&
        newDecisions.map((decision: types.Decision) => decision.nextBranchId),
    } as types.NarrativeBranch)
  }

  const handleNextBranchIdChange = (
    selectOption: types.SelectOption & { currentBranchId: string }
  ) => {
    const branchToUpdate = branches.find(
      (branch) => branch.id === selectOption.currentBranchId
    )

    updateBranch({
      ...branchToUpdate,
      nextBranchId: selectOption.value,
    } as types.BattleBranch | types.RewardBranch)
  }

  return (
    <Accordion id="connectBranches" title="Connect Branches" open>
      {branches.length > 0 ? (
        <>
          <p>
            Choose the branch which should be the entry point of the expedition.
          </p>
          <FormGroupSelect
            options={availableBranchesOptions}
            id="firstBranchId"
            label="First branch id"
            onChange={handleFirstBranchIdChange}
          />
          <ul>
            {branches.map((branch: types.Branch) => {
              const availableOptions = branches
                .filter(
                  (availableBranch: types.Branch) =>
                    availableBranch.id !== branch.id &&
                    availableBranch.id !== firstBranchId
                )
                .map((availableBranch: types.Branch) => {
                  return {
                    value: availableBranch.id,
                    label: `${availableBranch.id} (${availableBranch.type})`,
                    currentBranchId: branch.id,
                  }
                })

              switch (branch.type) {
                case 'narrative': {
                  const narrativeBranch = branch as types.NarrativeBranch

                  return (
                    <li key={branch.id}>
                      <p>Id: {branch.id}</p>
                      <p>Type: {branch.type}</p>
                      {narrativeBranch.decisions ? (
                        <>
                          <p>Decisions:</p>
                          <ul>
                            {narrativeBranch.decisions.map(
                              (decision: types.Decision) => {
                                const decisionOptions = availableOptions.map(
                                  (availableOption: types.SelectOption) => {
                                    return {
                                      ...availableOption,
                                      decisionId: decision._id,
                                    }
                                  }
                                )

                                return (
                                  <li key={decision._id}>
                                    {decision.text}
                                    <FormGroupSelect
                                      options={decisionOptions}
                                      id={`nextBranchId-${branch._id}-${decision._id}`}
                                      label="Next branch id"
                                      onChange={
                                        handleNarrativNextBranchIdChange
                                      }
                                    />
                                  </li>
                                )
                              }
                            )}
                          </ul>
                        </>
                      ) : (
                        <p>No Desicions</p>
                      )}
                    </li>
                  )
                }

                default: {
                  return (
                    <li key={branch.id}>
                      <p>Id: {branch.id}</p>
                      <p>Type: {branch.type}</p>
                      <FormGroupSelect
                        options={availableOptions}
                        id={`nextBranchId-${branch._id}`}
                        label="Next branch id"
                        onChange={handleNextBranchIdChange}
                      />
                    </li>
                  )
                }
              }
            })}
          </ul>
        </>
      ) : (
        <p>No branches added</p>
      )}
    </Accordion>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ConnectBranches))

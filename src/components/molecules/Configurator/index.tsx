import React, { useState } from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import Preview from 'components/molecules/Preview'
import Label from 'components/atoms/Label'

import Wrapper from './__styled__/Wrapper'
import Form from './__styled__/Form'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(state),
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(state),
  branchIds: selectors.DraftExpedition.SequenceConfig.Branches.getBranchIds(state),
})

const mapDispatchToProps = {
  setExpeditionName: actions.DraftExpedition.Name.setExpeditionName,
  setBigPocketVariantConfig:
    actions.DraftExpedition.BigPocketVariantConfig.setBigPocketVariantConfig,
  addBranch: actions.DraftExpedition.SequenceConfig.Branches.addBranch,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

type FormBranch = {
  identifier: string,
  type: 'narrative' | 'battle' | 'reward',
  nextBranchId?: string[] | null
}

const initialState: FormBranch = {
  identifier: '',
  type: 'narrative',
}

const Configurator = ({
  name,
  bigPocketVariantConfig,
  branches,
  branchIds,
  setExpeditionName,
  setBigPocketVariantConfig,
  addBranch,
}: Props) => {

  const [branch, setBranch] = useState<FormBranch>(initialState)
  const [nextBranchId, setNextBranchId] = useState<string | null>(null)

  const handleInputChange = (event: any) => {
    setExpeditionName(event.target.value)
  }

  const handleCheckboxChange = (event: any) => {
    setBigPocketVariantConfig(event.currentTarget.checked)
  }

  const handleBranchIdentifierChange = (event: any) => {
    setBranch({
      ...branch,
      identifier: event.target.value
    })
  }

  const handleBranchTypeChange = (event: any) => {
    setBranch({
      ...branch,
      type: event.target.value,
    })
  }

  const handleBranchNextBranchIdChange = (event: any) => {
    setNextBranchId(event.target.value)
  }

  const handleAddNextBranchId = (event: any, branchId: string) => {
    console.log(nextBranchId)
    console.log(branchId)
    setNextBranchId(null)
  }

  const handleAddBranch = () => {
    const { identifier, type } = branch

    if(!identifier) return

    const newBranch = {
      id: identifier,
      type,
    }

    addBranch(newBranch)
    setBranch(initialState)
  }

  // ToDo: REFACTOR: Split form into own components
  return (
    <Wrapper>
      <Form>
        <fieldset>
          <legend>Basic Information</legend>
          <Label htmlFor="name">Expedition Name</Label>
          <input
            id="name"
            name="name"
            onChange={handleInputChange}
            defaultValue={name}
          />

          <Label htmlFor="bigPocketVariantConfig">
            <input
              id="bigPocketVariantConfig"
              type="checkbox"
              name="bigPocketVariantConfig"
              onChange={handleCheckboxChange}
              defaultChecked={bigPocketVariantConfig}
            />
            Big Pocket Mode
          </Label>
        </fieldset>

        <fieldset>
          <legend>Branches</legend>
          <Label htmlFor="branchIdentifier">Branch identifier</Label>
          <input
            id="branchIdentifier"
            name="branchIdentifier"
            onChange={handleBranchIdentifierChange}
            value={branch.identifier}
          />

          <Label htmlFor="branchType">Branch type</Label>
          <select
            id="branchType"
            name="branchType"
            onChange={handleBranchTypeChange}
            value={branch.type}
          >
            <option value="narrative">narrative</option>
            <option value="battle">battle</option>
            <option value="reward">reward</option>
          </select>

          <button
            type="button"
            style={{ display: 'block', margin: '24px 0 0' }}
            onClick={handleAddBranch}
          >
            Add branch
          </button>

          {branches.length > 0 ? (
            <ul>
              {branches.map((branch) => {
                return (
                  <li key={branch.id}>
                    <p>{branch.id}</p>
                    <p>{branch.type}</p>
                    <p>{branch.nextBranchId?.map((id) => id)}</p>
                    {
                      branchIds.filter((id) => id !== branch.id).length !== 0 && (
                        <fieldset style={{ margin: '24px 0 0' }}>
                          <legend>Next branches ids</legend>
                          <Label htmlFor="branchNextBranchId">
                            Next branch identifier
                          </Label>
                          <select
                            id="branchNextBranchId"
                            name="branchNextBranchId"
                            onChange={handleBranchNextBranchIdChange}
                          >
                            <option>Select branch id...</option>
                            {branchIds.map((id) => {
                              return (
                                id !== branch.id && (
                                  <option key={id} value={id}>
                                    {id}
                                  </option>
                                )
                              )})}
                          </select>
                          <button
                            type="button"
                            style={{ display: 'block' }}
                            onClick={(event: any) =>
                              handleAddNextBranchId(event, branch.id)
                            }
                          >
                            Add next branch id
                          </button>
                          {
                              // ToDo: Use from State
                              nextBranchId ? (
                                <p>{nextBranchId}</p>
                              ) : (
                                <p>No next branches ids added</p>
                              )
                            }
                        </fieldset>
                      )
                    }
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No branches added</p>
          )}
        </fieldset>
      </Form>

      <Preview />
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Configurator))

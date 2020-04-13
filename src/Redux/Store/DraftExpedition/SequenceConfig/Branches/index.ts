import { createSelector } from 'reselect'

import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

///////////
// STATE //
///////////

type Branch = {
  id: string,
  type: 'narrative' | 'battle' | 'reward',
  nextBranchId?: string[]
}

type Branches = {
  [id: string]: Branch
}


export type State = Branches
export const initialState: State = {}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  ADD_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_BRANCH',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  addBranch: (branch: Branch) =>
    createAction(ActionTypes.ADD_BRANCH, branch),
}

export type Action = ActionsUnion<typeof actions>

/////////////
// REDUCER //
/////////////

export const Reducer: LoopReducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_BRANCH: {
      const { id, type, nextBranchId } = action.payload

      return {
        ...state,
        [id]: {
          id,
          type,
          nextBranchId
        }
      }
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type BranchesStateSlice = {
  DraftExpedition: {
    SequenceConfig: {
      Branches: State
    }
  }
}

const getBranchesState = (state: BranchesStateSlice) => state.DraftExpedition.SequenceConfig.Branches

const getBranchIds = createSelector([getBranchesState], (branches) =>
  Object.keys(branches)
)

const getBranches = createSelector(
  [getBranchesState], (
  branches
) =>
  Object.values(branches)
)

export const selectors = {
  getBranchesState,
  getBranchIds,
  getBranches,
}

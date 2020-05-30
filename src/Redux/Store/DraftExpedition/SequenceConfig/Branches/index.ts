import { createSelector } from 'reselect'
import { LoopReducer } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = types.Branches | {}
export const initialState: State = {}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  ADD_BRANCH = 'DraftExpedition/SequenceConfig/Branches/ADD_BRANCH',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  addBranch: (branch: types.NarrativeBranch) =>
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
      const { _id, id, type } = action.payload

      switch(type) {
        case "narrative": {
          const { text, decisions } = action.payload

          return {
            ...state,
            [_id]: {
              _id,
              id,
              type,
              text: text ? text : '',
              decisions: decisions ? [...decisions] : false
            },
          }
        }

        default: {
          return {
            ...state,
            [_id]: {
              _id,
              id,
              type,
            },
          }
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
